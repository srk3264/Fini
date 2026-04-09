import wink from 'wink-sentiment';

export type Mood = 'very_bad' | 'bad' | 'neutral' | 'good' | 'very_good';
export const ALLOWED_MOODS: Mood[] = ['bad','neutral','good','very_bad','very_good'];

export function classifyMood(text: string): Mood {
  const t = (text || '').trim();
  if (!t) return 'neutral';
  const { score } = wink(t) as { score: number };
  if (score <= -4) return 'very_bad';
  if (score <= -1) return 'bad';
  if (score === 0) return 'neutral';
  if (score <= 3) return 'good';
  return 'very_good';
}

export function normalizeMood(m: unknown): Mood | null {
  if (typeof m !== 'string') return null;
  const v = m as Mood;
  return (ALLOWED_MOODS as string[]).includes(v) ? v : null;
}
