export async function hf(model: string, payload: any) {
  const key = import.meta.env.VITE_HF_TOKEN as string | undefined;
  if (!key) throw new Error('hf:missing-token');
  const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

