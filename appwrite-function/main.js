

export default async ({ req, res, log, error }) => {
  // Read Hugging Face credentials from environment variables
  const HF_API_KEY = process.env.HF_API_KEY;
  const HF_TAGGING_MODEL = process.env.HF_TAGGING_MODEL || "facebook/bart-large-mnli";

  if (!HF_API_KEY) {
    error("Missing HF_API_KEY environment variable");
    return res.json({ error: "Missing Hugging Face API key" }, 500);
  }

  // Parse input
  let body = req.bodyRaw || req.body || "";
  try {
    if (typeof body === "string") body = JSON.parse(body);
  } catch (e) {
    error("Invalid JSON body");
    return res.json({ error: "Invalid JSON body" }, 400);
  }

  const { text, candidate_labels } = body;
  if (!text || !candidate_labels) {
    error("Missing text or candidate_labels");
    return res.json({ error: "Missing text or candidate_labels" }, 400);
  }

  // Call Hugging Face zero-shot classification API
 // Call Hugging Face zero-shot classification API
try {
  const API_URL = `https://router.huggingface.co/hf-inference/models/${HF_TAGGING_MODEL}`;

  const hfRes = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: text,
      parameters: {
        candidate_labels: candidate_labels
      }
    })
  });

  let hfData;
  const contentType = hfRes.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    hfData = await hfRes.json();
  } else {
    const textResponse = await hfRes.text();
    error(`Hugging Face non-JSON response: ${textResponse}`);
    return res.json({ error: `Hugging Face returned non-JSON: ${textResponse}` }, 500);
  }

  if (!hfRes.ok) {
    error(`Hugging Face HTTP error ${hfRes.status}: ${JSON.stringify(hfData)}`);
    return res.json({ error: hfData.error || `HTTP ${hfRes.status}` }, hfRes.status);
  }

  if (hfData.error) {
    error("Hugging Face error: " + hfData.error);
    return res.json({ error: hfData.error }, 500);
  }

  if (hfData.estimated_time) {
    error("Hugging Face model is loading: " + JSON.stringify(hfData));
    return res.json({ error: "Model is loading, please try again in a few seconds." }, 503);
  }

  // If response is an array of {label, score} objects
if (Array.isArray(hfData) && hfData.length > 0 && hfData[0].label && hfData[0].score !== undefined) {
  // Find the label with the highest score
  const top = hfData.reduce((max, item) => (item.score > max.score ? item : max), hfData[0]);
  return res.json({ label: top.label, score: top.score });
}

// The response is usually an object with labels and scores
if (hfData.labels && hfData.scores) {
  // Find the label with the highest score
  let maxIdx = 0;
  for (let i = 1; i < hfData.scores.length; i++) {
    if (hfData.scores[i] > hfData.scores[maxIdx]) maxIdx = i;
  }
  return res.json({ label: hfData.labels[maxIdx], score: hfData.scores[maxIdx] });
}

error("Unexpected Hugging Face response: " + JSON.stringify(hfData));
return res.json({ error: "Unexpected Hugging Face response format." }, 500);

} catch (e) {
  error("Failed to call Hugging Face: " + e.message);
  return res.json({ error: "Failed to call Hugging Face" }, 500);
}
};
