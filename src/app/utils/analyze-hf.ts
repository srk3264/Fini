import { hf } from './hf';

const ZERO_SHOT_MODEL = 'MoritzLaurer/deberta-v3-base-zeroshot-v2';
const LABELS = ['reflections','health','todo'];

export async function analyzeEntryHF(text: string): Promise<{ segments: { text: string; tag: string }[]; tags: string[] }> {
  const t = (text || '').trim();
  if (!t) return { segments: [], tags: [] };

  // Prefer chunking by explicit newlines (voice chunks), else fallback to sentence windows
  const rawChunks = t.split(/\n+/).map(s => s.trim()).filter(Boolean);
  const chunks: string[] = rawChunks.length > 1
    ? rawChunks
    : t.split(/(?<=\.|\?|!)\s+|\n+/).map(s => s.trim()).filter(Boolean);
  try { console.log('hf.chunks', chunks.length, chunks); } catch {}

  const segments: { text: string; tag: string }[] = [];
  const tagSet = new Set<string>();
  for (const ch of chunks) {
    if (ch.length < 8) continue;
    const z = await hf(ZERO_SHOT_MODEL, {
      inputs: ch,
      parameters: { candidate_labels: LABELS, multi_label: true }
    });
    const labels: string[] = z?.labels || z?.[0]?.labels || [];
    const scores: number[] = z?.scores || z?.[0]?.scores || [];
    // pick best label above threshold
    let bestLab: string | null = null; let best = 0;
    labels.forEach((lab, i) => { const s = scores?.[i] ?? 0; if (s > best && s >= 0.35 && LABELS.includes(lab)) { best = s; bestLab = lab; } });
    if (bestLab) {
      segments.push({ text: ch.slice(0, 240), tag: bestLab });
      tagSet.add(bestLab);
      try { console.log('hf.chunk.pick', { snippet: ch.slice(0, 40), label: bestLab, score: best }); } catch {}
    } else {
      try { console.log('hf.chunk.none', ch.slice(0, 40)); } catch {}
    }
  }

  return { segments, tags: Array.from(tagSet) };
}
