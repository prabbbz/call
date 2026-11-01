# Telepon AI

Ngobrol suara dengan AI seperti telepon. 8 karakter (4 cewek, 4 cowok), tiap karakter punya kepribadian, suara, nada, dan kecepatan sendiri.

## Deploy ke Vercel
1. Upload folder ini ke GitHub (atau jalankan `npx vercel` di folder ini).
2. Di vercel.com: **Add New > Project**, pilih repo-nya.
3. Buka **Settings > Environment Variables**, tambahkan `ANTHROPIC_API_KEY` (dari console.anthropic.com).
   Opsional: `ANTHROPIC_MODEL` (default `claude-haiku-5-5`, cepat dan murah).
4. Klik **Deploy**, lalu buka link `.vercel.app` di Chrome atau Edge.

## Catatan
- Mikrofon butuh HTTPS (otomatis di Vercel) dan izin dari browser.
- Suara berasal dari suara bawaan perangkat, jadi pilihannya beda di tiap HP/komputer. Pilih manual lewat menu Suara perangkat.
- Siapa pun yang punya link bisa memakai API key-mu. Batasi pemakaian di dashboard Anthropic atau aktifkan Vercel Authentication.
