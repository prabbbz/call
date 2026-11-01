# Telepon AI Realtime

Ngobrol suara dua arah dengan AI secara realtime lewat OpenAI Realtime API (WebRTC), mirip mode suara ChatGPT. AI bisa disela kapan saja: begitu kamu bicara, AI langsung berhenti dan mendengarkan.

## Deploy ke Vercel (paket Hobby gratis cukup)
1. Upload folder ini ke GitHub (atau jalankan `npx vercel` di folder ini).
2. Di vercel.com: Add New > Project, pilih repo-nya.
3. Settings > Environment Variables, tambahkan `OPENAI_API_KEY` (dari platform.openai.com/api-keys).
   Opsional: `OPENAI_REALTIME_MODEL` (default `gpt-realtime-2.1`; kalau error "model not found", isi `gpt-realtime`).
4. Deploy, buka link `.vercel.app`, izinkan mikrofon, tekan tombol telepon.

## Catatan
- API OpenAI butuh saldo sendiri di platform.openai.com (langganan ChatGPT Plus tidak termasuk). Realtime API lebih mahal daripada chat teks karena memproses audio, jadi pasang batas pengeluaran bulanan di dashboard OpenAI.
- Pakai headphone bila mungkin supaya suara AI tidak terdengar kembali oleh mikrofon.
- Siapa pun yang punya link bisa memakai key-mu; aktifkan Vercel Authentication bila perlu.
- Ganti karakter atau suara saat telepon berjalan akan menyambung ulang panggilan.
