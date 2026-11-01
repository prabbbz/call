// Vercel Serverless Function: suara realistis via OpenAI TTS (gpt-4o-mini-tts)
const VOICES = ["alloy","ash","ballad","coral","echo","fable","nova","onyx","sage","shimmer","verse"];
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Gunakan POST" });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "OPENAI_API_KEY belum diatur di Vercel" });
  const { text, voice, instructions } = req.body || {};
  if (!text) return res.status(400).json({ error: "text kosong" });
  try {
    const r = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: "Bearer " + key },
      body: JSON.stringify({
        model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
        voice: VOICES.includes(voice) ? voice : "coral",
        input: String(text).slice(0, 600),
        instructions: String(instructions || "").slice(0, 800),
        response_format: "mp3"
      })
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      return res.status(r.status).json({ error: (e.error && e.error.message) || "TTS gagal" });
    }
    res.setHeader("Content-Type", "audio/mpeg");
    res.status(200).send(Buffer.from(await r.arrayBuffer()));
  } catch (e) {
    res.status(500).json({ error: "Server gagal menghubungi OpenAI" });
  }
};
