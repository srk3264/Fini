export type SegmentTag = 'reflections' | 'health' | 'todo' | 'reminders';

export interface SegmentRange {
  start: number;
  end: number; // exclusive
  tag: SegmentTag;
}

// Very light heuristic analyzers; no heavy deps. If chrono-node is available,
// we optionally use it for reminders; otherwise regex fallback.
export function analyzeEntry(text: string): { segments: SegmentRange[]; tags: SegmentTag[] } {
  const t = (text || '').trim();
  if (!t) return { segments: [], tags: [] };

  const segments: SegmentRange[] = [];

  // 1) Reminders: try chrono-node if present
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const chrono = require('chrono-node');
    const parsed = chrono.parse(t) as Array<{ index: number; text: string }>;
    for (const r of parsed) {
      if (r && typeof r.index === 'number' && typeof r.text === 'string' && r.text.length) {
        segments.push({ start: r.index, end: r.index + r.text.length, tag: 'reminders' });
      }
    }
  } catch {
    // Fallback regex for common time phrases
    const re = /(tomorrow|today|tonight|next\s+(week|month|monday|tuesday|wednesday|thursday|friday|saturday|sunday)|\bby\s+\w+day\b|\b\d{1,2}(:\d{2})?\s*(am|pm)\b|\bon\s+\d{1,2}\/\d{1,2}\b)/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(t))) {
      segments.push({ start: m.index, end: m.index + m[0].length, tag: 'reminders' });
    }
  }

  // 2) Split into sentences (very naive)
  const sentenceRegex = /[^.!?\n]+[.!?]?/g;
  const sentences: Array<{ start: number; end: number; s: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = sentenceRegex.exec(t))) {
    const s = m[0].trim();
    if (!s) continue;
    const start = m.index;
    const end = m.index + m[0].length;
    sentences.push({ start, end, s });
  }

  // 3) TODOs
  const todoRe = /(^(?:-\s*\[?\s*\]?\s*)?\b(call|email|text|schedule|book|pay|buy|send|finish|start|write|draft|follow\s*up)\b)|\b(i\s+(need|have)\s+to|to-?do)\b/i;
  for (const sn of sentences) {
    if (todoRe.test(sn.s)) segments.push({ start: sn.start, end: sn.end, tag: 'todo' });
  }

  // 4) Reflections
  const reflRe = /\bI\s+(feel|felt|think|thought|realized|learned|wonder|consider|grateful)\b/i;
  for (const sn of sentences) {
    if (reflRe.test(sn.s)) segments.push({ start: sn.start, end: sn.end, tag: 'reflections' });
  }

  // 5) Health
  const healthRe = /(anxious|anxiety|stressed|stress|sleep|insomnia|tired|energy|run|walk|workout|gym|yoga|meditate|therapy|diet|eat|water|headache)/i;
  for (const sn of sentences) {
    if (healthRe.test(sn.s)) segments.push({ start: sn.start, end: sn.end, tag: 'health' });
  }

  // Normalize: merge overlapping identical-tag segments and cap lengths
  segments.sort((a, b) => a.start - b.start || a.end - b.end);
  const merged: SegmentRange[] = [];
  for (const seg of segments) {
    const capped = { ...seg, end: Math.min(seg.end, seg.start + 240) };
    const last = merged[merged.length - 1];
    if (last && last.tag === capped.tag && capped.start <= last.end) {
      last.end = Math.max(last.end, capped.end);
    } else {
      merged.push(capped);
    }
  }

  const tagSet = new Set<SegmentTag>();
  for (const s of merged) tagSet.add(s.tag);
  return { segments: merged, tags: Array.from(tagSet) };
}

