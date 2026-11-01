// Vercel Serverless Function: membuat kunci sementara untuk OpenAI Realtime (WebRTC).
// API key asli tetap di server; browser hanya menerima kunci sementara.
const VOICES = ["alloy","ash","ballad","coral","echo","sage","shimmer","verse","marin","cedar"];
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Gunakan POST" });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "OPENAI_API_KEY belum diatur di Vercel" });
  const { instructions, voice, lang, speed } = req.body || {};
  const tr = { model: "gpt-4o-mini-transcribe" };
  if (lang === "id" || lang === "en") tr.language = lang;
  const sp = Math.min(1.5, Math.max(0.7, Number(speed) || 1));
  try {
    const r = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: "Bearer " + key },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model: process.env.OPENAI_REALTIME_MODEL || "gpt-realtime-2.1",
          instructions: String(instructions || "").slice(0, 4000),
          audio: {
            input: {
              noise_reduction: { type: "near_field" },
              transcription: tr,
              turn_detection: { type: "semantic_vad", eagerness: "medium", create_response: true, interrupt_response: true }
            },
            output: { voice: VOICES.includes(voice) ? voice : "marin", speed: sp }
          }
        }
      })
    });
    const d = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: (d.error && d.error.message) || "Gagal membuat sesi" });
    res.status(200).json({ token: d.value || (d.client_secret && d.client_secret.value) });
  } catch (e) {
    res.status(500).json({ error: "Server gagal menghubungi OpenAI" });
  }
};
