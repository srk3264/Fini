module.exports = async ({ req, res, log, error }) => {
  const HF_API_KEY = process.env.HF_API_KEY;
  const HF_TAGGING_MODEL =
    process.env.HF_TAGGING_MODEL || "valhalla/distilbart-mnli-12-1";

  log("Function started");

  if (!HF_API_KEY) {
    return res.json({ error: "Missing HF_API_KEY" }, 500);
  }

  let body = req.bodyRaw || req.body || {};
  try {
    if (typeof body === "string") body = JSON.parse(body);
  } catch {
    return res.json({ error: "Invalid JSON body" }, 400);
  }

  const { text, candidate_labels } = body;

  if (!text || !candidate_labels) {
    return res.json({ error: "Missing text or candidate_labels" }, 400);
  }

  const API_URL = `https://router.huggingface.co/hf-inference/models/${HF_TAGGING_MODEL}`;

  try {
    log("Calling Hugging Face");

    // timeout wrapper
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const hfRes = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        parameters: { candidate_labels },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const contentType = hfRes.headers.get("content-type") || "";
    let hfData;

    if (contentType.includes("application/json")) {
      hfData = await hfRes.json();
    } else {
      const txt = await hfRes.text();
      return res.json(
        { error: "Non-JSON response from HF", detail: txt },
        500
      );
    }

    if (!hfRes.ok) {
      return res.json(
        { error: hfData.error || "HF request failed" },
        hfRes.status
      );
    }

    if (hfData.estimated_time) {
      return res.json({ error: "Model loading, try again" }, 503);
    }

    let label, score;

    if (Array.isArray(hfData)) {
      const top = hfData.reduce((a, b) => (b.score > a.score ? b : a));
      label = top.label;
      score = top.score;
    } else if (hfData.labels && hfData.scores) {
      const maxIdx = hfData.scores.indexOf(Math.max(...hfData.scores));
      label = hfData.labels[maxIdx];
      score = hfData.scores[maxIdx];
    } else {
      return res.json({ error: "Unexpected HF response" }, 500);
    }

    return res.json({ label, score });
  } catch (e) {
    if (e.name === "AbortError") {
      return res.json({ error: "Request timed out" }, 504);
    }

    error(e.message);
    return res.json({ error: "Server error" }, 500);
  }
};