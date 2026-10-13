# RE:GEN — Daur Ulang Sampah, Reimajinasikan Masa Depan

Prototipe platform untuk kompetisi tingkat nasional (PNB IT Competition #18 — subtema *Lingkungan*) yang mengubah sampah menjadi nilai lewat pengumpulan, pemilahan, edukasi, Green Points, reward, dan pelacakan dampak lingkungan.

> **Sampahmu Punya Kehidupan Kedua.**

---

## Konsep

**Sampah → Kumpulkan → Pilah → Regenerasi → Dampak**

RE:GEN bukan sekadar situs "bank sampah" biasa. Platform ini dirancang agar terasa seperti startup teknologi lingkungan yang berpandangan maju:

- Kenali sampah apa saja yang bisa dikelola
- Temukan titik drop terdekat
- Kumpulkan Green Points dari setiap kontribusi
- Ikuti tantangan keberlanjutan
- Tukarkan reward
- Pantau dampak lingkungan yang terukur

## Bahasa Desain

- **Palet** — hijau hutan tua, hijau cerah, aksen lime di atas latar off-white & charcoal
- **Tipografi** — Plus Jakarta Sans (judul) + Manrope (teks)
- **Konsep visual** — *Regenerasi Sirkular*: cincin orbit, cincin regenerasi, lengkung organik, garis perjalanan mengalir
- **Alur cerita** — Hero → Masalah → Solusi → Cara Kerja → Penjelajah Sampah → Green Points → Dampak → Tantangan → CTA

## Halaman

| Halaman | Fungsi |
| --- | --- |
| `index.html` | Beranda bercerita dengan penjelajah sampah interaktif |
| `login.html` / `register.html` | Autentikasi dengan validasi & tata letak split premium |
| `dashboard.html` | Dashboard Green Points, progres cincin, aktivitas |
| `profile.html` | Level, streak, prestasi, panduan sampah |
| `explore.html` | Katalog sampah yang bisa dicari & difilter |
| `detail.html` | Detail sampah: pemilahan, pembersihan, proses, dampak, drop points |
| `map.html` | Peta titik drop Leaflet dengan pencarian & filter |
| `challenges.html` | Tantangan dengan pelacakan harian interaktif |
| `rewards.html` | Katalog reward GP dengan simulasi penukaran |
| `impact.html` | Dashboard dampak berbasis data dengan grafik & linimasa perjalanan |

## Teknologi

- HTML5, CSS3, Vanilla JavaScript (ES6+)
- Sistem desain CSS custom tanpa Tailwind (modular: `style.css`, `components.css`, `responsive.css`)
- Google Fonts, Font Awesome
- GSAP (enhancement progresif, opsional)
- Leaflet.js (peta)
- localStorage untuk demo autentikasi, poin, dan status penukaran

Hanya memakai pustaka yang diizinkan. Tanpa backend, tanpa build step — berjalan sepenuhnya sebagai frontend statis.

## Struktur

```
├── index.html
├── login.html        register.html    dashboard.html
├── explore.html      detail.html      map.html
├── challenges.html   rewards.html     impact.html     profile.html
├── css/
│   ├── style.css       (token, dasar, section)
│   ├── components.css  (komponen yang dipakai ulang)
│   └── responsive.css  (390 / 820 / 1440)
├── js/
│   ├── data.js         (semua data demo, terpusat)
│   ├── main.js         (navbar, footer, toast, modal, validasi)
│   ├── animations.js   (reveal, counter, progres)
│   ├── dashboard.js    (dashboard, tantangan, interaksi)
│   └── map.js          (logika peta Leaflet)
├── assets/images|icons|illustrations
└── README.md
```

## Menjalankan

Buka `index.html` di browser modern mana pun (disarankan Chrome/Edge). Tidak perlu server. Untuk memuat tile peta, dibutuhkan koneksi internet. Seluruh lokasi pada peta adalah data demo ilustratif.

## Catatan Demo

- Semua statistik bersifat ilustrasi/simulasi dan diberi label demikian.
- "Masuk" disimulasikan lewat localStorage (email valid apa pun + kata sandi minimal 6 karakter).
- Koordinat titik drop hanyalah lokasi contoh, bukan alamat sebenarnya.