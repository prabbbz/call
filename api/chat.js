// Vercel Serverless Function: meneruskan chat ke Anthropic API (API key aman di server)
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Gunakan POST" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ error: "ANTHROPIC_API_KEY belum diatur di Vercel" });
  const { messages, system } = req.body || {};
  if (!Array.isArray(messages) || !messages.length) return res.status(400).json({ error: "messages kosong" });
  const clean = messages.slice(-20).map(m => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 2000)
  }));
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5",
        max_tokens: 300,
        system: String(system || "").slice(0, 3000),
        messages: clean
      })
    });
    const d = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: (d.error && d.error.message) || "Permintaan gagal" });
    res.status(200).json({ reply: (d.content || []).map(b => b.text || "").join("").trim() });
  } catch (e) {
    res.status(500).json({ error: "Server gagal menghubungi AI" });
  }
};
