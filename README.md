# Telepon AI (GPT)

Ngobrol suara dengan AI seperti telepon. 8 karakter (4 cewek, 4 cowok). Otak: model GPT. Suara: OpenAI TTS (gpt-4o-mini-tts) yang terdengar natural dan bisa diarahkan gaya bicaranya.

## Deploy ke Vercel (paket Hobby gratis cukup)
1. Upload folder ini ke GitHub (atau jalankan `npx vercel` di folder ini).
2. Di vercel.com: Add New > Project, pilih repo-nya.
3. Settings > Environment Variables, tambahkan `OPENAI_API_KEY` (dari platform.openai.com/api-keys).
   Opsional: `OPENAI_MODEL` (default `gpt-4.1-mini`) dan `OPENAI_TTS_MODEL` (default `gpt-4o-mini-tts`).
4. Deploy, lalu buka link `.vercel.app` di Chrome atau Edge.

## Catatan
- API key OpenAI butuh saldo di platform.openai.com. Langganan ChatGPT Plus tidak termasuk API.
- Pasang batas pengeluaran bulanan di dashboard OpenAI. Siapa pun yang punya link bisa memakai key-mu; aktifkan Vercel Authentication bila perlu.
- Mikrofon memakai pengenalan suara browser (Chrome/Edge). Mikrofon butuh HTTPS, otomatis di Vercel.
