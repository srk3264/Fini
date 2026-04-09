export type Tag = 'reflections' | 'health' | 'todo' | 'reminders';

const RE_TODO = /(\b(i\s+(need|have)\s+to|to-?do|call|email|text|schedule|book|pay|buy|send|finish|start|write|follow\s*up)\b)/i;
const RE_REFLECT = /\bI\s+(feel|felt|think|thought|realized|learned|wonder|grateful)\b/i;
const RE_HEALTH = /(anxious|anxiety|stressed|stress|sleep|insomnia|tired|energy|run|walk|workout|gym|yoga|meditate|therapy|diet|eat|water|headache)/i;
// Lightweight date/time cue detector for reminders (no chrono required)
const RE_REMINDERS = /(tomorrow|today|tonight|next\s+(week|month|monday|tuesday|wednesday|thursday|friday|saturday|sunday)|\bby\s+\w+day\b|\b\d{1,2}(:\d{2})?\s*(am|pm)\b|\bon\s+\d{1,2}\/\d{1,2}\b)/i;

export function classifyTag(text: string): Tag | null {
  const t = (text || '').trim();
  if (!t) return null;
  if (RE_REMINDERS.test(t)) return 'reminders';
  if (RE_TODO.test(t)) return 'todo';
  if (RE_HEALTH.test(t)) return 'health';
  if (RE_REFLECT.test(t)) return 'reflections';
  return null;
}
