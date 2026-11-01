// Vercel Serverless Function: chat via OpenAI (API key aman di server)
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Gunakan POST" });
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "OPENAI_API_KEY belum diatur di Vercel" });
  const { messages, system } = req.body || {};
  if (!Array.isArray(messages) || !messages.length) return res.status(400).json({ error: "messages kosong" });
  const clean = messages.slice(-20).map(m => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 2000)
  }));
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: "Bearer " + key },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        max_completion_tokens: 400,
        messages: [{ role: "system", content: String(system || "").slice(0, 3000) }, ...clean]
      })
    });
    const d = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: (d.error && d.error.message) || "Permintaan gagal" });
    res.status(200).json({ reply: ((d.choices && d.choices[0] && d.choices[0].message.content) || "").trim() });
  } catch (e) {
    res.status(500).json({ error: "Server gagal menghubungi OpenAI" });
  }
};
