const REGEN = {
  version: "1.0",
};

// Meta kategori sampah
const CATEGORY_META = {
  plastic: { label: "Plastik", icon: "fa-bottle-water", color: "cat-plastic", colorBg: "cat-plastic-bg" },
  paper: { label: "Kertas", icon: "fa-file-lines", color: "cat-paper", colorBg: "cat-paper-bg" },
  glass: { label: "Kaca", icon: "fa-wine-bottle", color: "cat-glass", colorBg: "cat-glass-bg" },
  metal: { label: "Logam", icon: "fa-can-food", color: "cat-metal", colorBg: "cat-metal-bg" },
  organic: { label: "Organik", icon: "fa-leaf", color: "cat-organic", colorBg: "cat-organic-bg" },
  mixed: { label: "Campuran", icon: "fa-recycle", color: "cat-mixed", colorBg: "cat-mixed-bg" },
};

// Semua nilai berikut merupakan data demo/ilustrasi untuk prototipe lomba.
const wasteData = [
  {
    id: "pet-bottle",
    name: "Botol PET",
    category: "plastic",
    icon: "fa-bottle-water",
    points: 20,
    process: "Daur ulang",
    impact: "Mengurangi sampah plastik; satu botol menghemat ±2 g minyak mentah.",
    short: "Diolah menjadi serat pakaian, karpet, sampai botol baru.",
    sortSteps: "Lepas tutupnya, bilas bagian dalam, lalu tiriskan sebelum disimpan.",
    cleanSteps: "Bilas dengan air, buang labelnya jika diminta titik drop.",
    afterSteps: "Dikemas, dikirim ke fasilitas, dicacah, dilelehkan, lalu dibentuk lagi jadi produk baru.",
    impacts: [
      { icon: "fa-bottle-water", num: "0,9 kg", label: "CO₂ terhindar / kg" },
      { icon: "fa-droplet", num: "3 L", label: "Air terhemat / kg" },
      { icon: "fa-recycle", num: "100%", label: "Bisa didaur ulang" }
    ]
  },
  {
    id: "paper-box",
    name: "Kardus",
    category: "paper",
    icon: "fa-box",
    points: 12,
    process: "Bubur kertas",
    impact: "Menyelamatkan pohon dan meringankan beban TPA.",
    short: "Diolah menjadi kertas daur ulang dan kardus baru.",
    sortSteps: "Lipat kardus, lepaskan selotip dan plastik pelapisnya.",
    cleanSteps: "Pastikan kering dan bebas sisa makanan.",
    afterSteps: "Dipres jadi bale, dijadikan bubur dengan air, lalu digulung menjadi lembaran baru.",
    impacts: [
      { icon: "fa-tree", num: "17", label: "Pohon / ton" },
      { icon: "fa-droplet", num: "26 ribu L", label: "Air / ton" },
      { icon: "fa-bolt", num: "45%", label: "Hemat energi" }
    ]
  },
  {
    id: "glass-jar",
    name: "Jar Kaca",
    category: "glass",
    icon: "fa-jar",
    points: 15,
    process: "Peleburan ulang",
    impact: "Kaca bisa didaur ulang tanpa henti tanpa kehilangan kualitas.",
    short: "Dilebur dan dicetak lagi jadi botol serta jar baru.",
    sortSteps: "Pisahkan per warna jika diminta; tutup dikumpulkan terpisah.",
    cleanSteps: "Bilas sampai bersih — kaca harus bening untuk didaur ulang.",
    afterSteps: "Dihancurkan jadi cullet, dilelehkan di suhu tinggi, lalu dibentuk kembali.",
    impacts: [
      { icon: "fa-infinity", num: "∞", label: "Bisa terus didaur ulang" },
      { icon: "fa-bolt", num: "30%", label: "Hemat energi" },
      { icon: "fa-temperature-high", num: "1500°C", label: "Suhu leleh" }
    ]
  },
  {
    id: "aluminum-can",
    name: "Kaleng Aluminium",
    category: "metal",
    icon: "fa-can-food",
    points: 25,
    process: "Peleburan ulang",
    impact: "Satu kaleng yang didaur ulang cukup untuk menyalakan TV selama 3 jam.",
    short: "Dilebur lalu digulung lagi jadi kaleng baru, berulang-ulang.",
    sortSteps: "Kosongkan dan pipihkan kaleng agar hemat tempat.",
    cleanSteps: "Bilas ringan lalu keringkan.",
    afterSteps: "Dihancurkan, dilebur, lalu digulung menjadi lembaran aluminium baru.",
    impacts: [
      { icon: "fa-bolt", num: "95%", label: "Hemat energi" },
      { icon: "fa-infinity", num: "Tanpa henti", label: "Daur ulang" },
      { icon: "fa-tv", num: "3 jam", label: "Daya / kaleng" }
    ]
  },
  {
    id: "food-waste",
    name: "Sampah Makanan",
    category: "organic",
    icon: "fa-apple-whole",
    points: 18,
    process: "Pengomposan",
    impact: "Mengubah sisa makanan jadi tanah yang kaya nutrisi.",
    short: "Dikomposkan menjadi tanah yang menumbuhkan makanan baru.",
    sortSteps: "Kumpulkan sisa sayur dan buah; hindari daging dan minyak.",
    cleanSteps: "Tak perlu dicuci — cukup buang bahan non-organiknya.",
    afterSteps: "Dikompos dengan aliran udara, menjadi pupuk dalam hitungan pekan.",
    impacts: [
      { icon: "fa-seedling", num: "Tanah", label: "Hasil akhir" },
      { icon: "fa-wind", num: "0", label: "Metana terlepas" },
      { icon: "fa-hand-holding-droplet", num: "Kaya", label: "Nutrisi" }
    ]
  },
  {
    id: "newspaper",
    name: "Koran Bekas",
    category: "paper",
    icon: "fa-newspaper",
    points: 10,
    process: "Bubur kertas",
    impact: "Mengurangi kebutuhan menebang pohon baru.",
    short: "Dijadikan kertas baru dan kemasan.",
    sortSteps: "Ikat koran, jaga tetap kering dan bersih.",
    cleanSteps: "Buang sisipan mengilap dan bungkus plastiknya.",
    afterSteps: "Dihilangkan tintanya lalu dijadikan bubur kertas baru.",
    impacts: [
      { icon: "fa-tree", num: "17", label: "Pohon / ton" },
      { icon: "fa-droplet", num: "26 ribu L", label: "Air / ton" },
      { icon: "fa-recycle", num: "Pakai ulang", label: "Proses" }
    ]
  },
  {
    id: "storage-jar",
    name: "Kaleng Logam",
    category: "metal",
    icon: "fa-utensils",
    points: 15,
    process: "Peleburan ulang",
    impact: "Menjauhkan besi dan timah dari TPA.",
    short: "Dilebur menjadi produk baja baru.",
    sortSteps: "Kosongkan, bilas, dan lepaskan label bila memungkinkan.",
    cleanSteps: "Bilas menyeluruh agar tidak mengundang hama.",
    afterSteps: "Dilebur lalu dicampur menjadi baja baru.",
    impacts: [
      { icon: "fa-bolt", num: "74%", label: "Hemat energi" },
      { icon: "fa-arrow-rotate-right", num: "Tiap kali", label: "Bisa dipakai ulang" },
      { icon: "fa-truck", num: "1,5 ton", label: "Bijih / ton" }
    ]
  },
  {
    id: "plastic-bag",
    name: "Bungkus Plastik",
    category: "plastic",
    icon: "fa-bag-shopping",
    points: 8,
    process: "Daur ulang turunan",
    impact: "Bungkus plastik jadi bangku taman dan papan jalan.",
    short: "Diubah menjadi produk outdoor yang awet.",
    sortSteps: "Bersihkan dan keringkan; kumpulkan banyak sekaligus.",
    cleanSteps: "Harus bersih — sisa makanan mencemari satu tumpukan.",
    afterSteps: "Dilelehkan lalu dicetak menjadi kayu komposit.",
    impacts: [
      { icon: "fa-bench-tree", num: "Baru", label: "Produk" },
      { icon: "fa-droplet", num: "Bersih", label: "Syaratnya" },
      { icon: "fa-recycle", num: "Hidup kedua", label: "Proses" }
    ]
  },
  {
    id: "glass-bottle",
    name: "Botol Kaca",
    category: "glass",
    icon: "fa-wine-bottle",
    points: 15,
    process: "Peleburan ulang",
    impact: "Menahan kaca agar tak menumpuk di TPA selamanya.",
    short: "Dilebur jadi botol baru atau fiberglass.",
    sortSteps: "Pisahkan per warna; buang tutup dan sumbat.",
    cleanSteps: "Bilas bagian dalam hingga tak ada sisa.",
    afterSteps: "Dihancurkan jadi cullet, dilelehkan, lalu dicetak lagi.",
    impacts: [
      { icon: "fa-infinity", num: "∞", label: "Tingkat daur ulang" },
      { icon: "fa-bolt", num: "30%", label: "Hemat energi" },
      { icon: "fa-weight-hanging", num: "Berat", label: "Untuk diangkut" }
    ]
  },
  {
    id: "mixed-recyclables",
    name: "Campuran Daur Ulang",
    category: "mixed",
    icon: "fa-recycle",
    points: 14,
    process: "Pemilahan",
    impact: "Sekumpulan barang yang umumnya bisa didaur ulang.",
    short: "Dipilah di pusat kami menjadi aliran material yang bersih.",
    sortSteps: "Gabungkan kertas, plastik, kaca, dan logam yang sudah bersih.",
    cleanSteps: "Semua harus bersih dan kering sebelum digabung.",
    afterSteps: "Dikirim ke jalur daur ulang yang sesuai di pusat.",
    impacts: [
      { icon: "fa-layer-group", num: "4+", label: "Jenis material" },
      { icon: "fa-arrow-right-arrow-left", num: "Terpilah", label: "Saat tiba" },
      { icon: "fa-hand-holding-heart", num: "Mudah", label: "Ikut berkontribusi" }
    ]
  },
  {
    id: "tetrapak",
    name: "Kemasan Karton Minuman",
    category: "mixed",
    icon: "fa-cup-straw",
    points: 9,
    process: "Pulping hidrolik",
    impact: "Memulihkan lapisan kertas, plastik, dan aluminium.",
    short: "Dipisah menjadi lapisan kertas dan polialuminium.",
    sortSteps: "Kosongkan, bilas, lalu pipihkan kartonnya.",
    cleanSteps: "Bilas dan keringkan sebelum disetor.",
    afterSteps: "Direndam untuk memisahkan lapisan demi lapisan.",
    impacts: [
      { icon: "fa-layer-group", num: "3", label: "Lapisan" },
      { icon: "fa-droplet", num: "Bilas", label: "Diperlukan" },
      { icon: "fa-recycle", num: "Pulih", label: "Bahan" }
    ]
  },
  {
    id: "electronics",
    name: "Elektronik Kecil",
    category: "metal",
    icon: "fa-mobile-screen-button",
    points: 50,
    process: "Daur ulang e-waste",
    impact: "Memulihkan logam mulia dan mencegah kebocoran zat beracun.",
    short: "Logam dan plastik berharga diambil kembali dengan aman.",
    sortSteps: "Lepas baterai; bawa ke titik e-waste khusus.",
    cleanSteps: "Hapus data dari perangkat sebelum disetor.",
    afterSteps: "Dicacah dan dipisah menjadi logam, plastik, serta kaca.",
    impacts: [
      { icon: "fa-gem", num: "Au & Ag", label: "Dipulihkan" },
      { icon: "fa-shield-halved", num: "Aman", label: "Pembuangan" },
      { icon: "fa-magnifying-glass", num: "Hapus", label: "Data dulu" }
    ]
  },
];

// Titik drop (lokasi ilustrasi/demo, bukan alamat asli)
const dropPoints = [
  {
    id: 1,
    name: "RE:GEN Hub A",
    status: "open",
    distance: "1,2 km",
    lat: -6.2000,
    lng: 106.8300,
    address: "Jl. Regenerasi No. 10",
    cats: ["plastic", "paper", "metal"],
    hours: "08.00 - 20.00"
  },
  {
    id: 2,
    name: "RE:GEN Titik Komunitas",
    status: "open",
    distance: "2,4 km",
    lat: -6.2110,
    lng: 106.8400,
    address: "Pusat Komunitas, Jl. Hijau",
    cats: ["paper", "glass", "organic"],
    hours: "07.00 - 21.00"
  },
  {
    id: 3,
    name: "Titik Drop Kampus",
    status: "busy",
    distance: "0,8 km",
    lat: -6.2050,
    lng: 106.8200,
    address: "Plaza Utama Kampus",
    cats: ["plastic", "paper", "metal", "glass"],
    hours: "09.00 - 17.00"
  },
  {
    id: 4,
    name: "Gudang Eco",
    status: "open",
    distance: "3,1 km",
    lat: -6.1920,
    lng: 106.8440,
    address: "Jl. Daur Ulang No. 4",
    cats: ["mixed", "metal", "plastic"],
    hours: "08.00 - 18.00"
  },
  {
    id: 5,
    name: "Stasiun Pasar Lokal",
    status: "open",
    distance: "4,0 km",
    lat: -6.2180,
    lng: 106.8150,
    address: "Pasar Hijau, Blok C",
    cats: ["organic", "paper"],
    hours: "06.00 - 22.00"
  },
];

// Tantangan
const challengesData = [
  {
    id: "ch-1",
    name: "7 Hari Bebas Plastik",
    icon: "fa-bottle-water",
    desc: "Hidup seminggu tanpa plastik sekali pakai. Setiap pembelian bebas plastik memberimu Green Points ekstra.",
    totalDays: 7,
    done: 6,
    gpa: 120
  },
  {
    id: "ch-2",
    name: "Bawa Botol Minum Sendiri",
    icon: "fa-person-running",
    desc: "Bawa botol minum ke mana pun selama 5 hari dan tinggalkan botol plastik sekali pakai.",
    totalDays: 5,
    done: 2,
    gpa: 80
  },
  {
    id: "ch-3",
    name: "Pilah Sampahmu",
    icon: "fa-shuffle",
    desc: "Pilah sampah rumah tanggamu ke minimal 4 kategori selama 3 hari berturut-turut.",
    totalDays: 3,
    done: 0,
    gpa: 60
  },
];

const otherChallenges = [
  { name: "Tanpa Plastik Sekali Pakai", icon: "fa-ban", gpa: 100 },
  { name: "Bersihkan Lingkungan Sekitarmu", icon: "fa-broom", gpa: 150 },
  { name: "Minggu Daur Ulang", icon: "fa-recycle", gpa: 200 },
];

// Data pengguna (demo)
const defaultUser = {
  name: "Alex Regenerator",
  email: "alex@regen.id",
  level: "Penjelajah Lingkungan",
  points: 742,
  streak: 14,
  impactKg: 24.8,
  joined: "Bergabung April 2026",
  badges: [
    { name: "Drop Pertama", icon: "fa-location-dot", unlocked: true },
    { name: "Eco Starter", icon: "fa-seedling", unlocked: true },
    { name: "Pejuang Plastik", icon: "fa-shield-halved", unlocked: true },
    { name: "Pahlawan Komunitas", icon: "fa-users", unlocked: false },
  ]
};

// Log aktivitas
const activities = [
  { icon: "fa-bottle-water", title: "Botol Plastik", time: "Hari ini", gp: 40 },
  { icon: "fa-file-lines", title: "Serah Kertas", time: "Kemarin", gp: 80 },
  { icon: "fa-trophy", title: "Tantangan Komunitas", time: "2 hari lalu", gp: 120 },
  { icon: "fa-apple-whole", title: "Sampah Organik", time: "3 hari lalu", gp: 25 },
  { icon: "fa-box", title: "Kardus", time: "4 hari lalu", gp: 36 },
];

// Reward
const rewardsData = [
  { name: "Botol Minum", icon: "fa-bottle-droplet", cost: 500, desc: "Botol stainless premium pengganti plastik sekali pakai." },
  { name: "Tas Belanja Eco", icon: "fa-bag-shopping", cost: 800, desc: "Tas belanja awet dari kain daur ulang untuk gaya bebas plastik." },
  { name: "Paket Tanam", icon: "fa-seedling", cost: 1200, desc: "Tanam sayuran sendiri, lengkap dengan biji, pot, dan kompos pemula." },
  { name: "Penanaman Pohon Komunitas", icon: "fa-tree", cost: 1500, desc: "Satu pohon ditanam atas namamu di kawasan hijau RE:GEN." },
];

// Prestasi pengguna
const achievements = [
  { id: "a1", name: "Drop Pertama", icon: "fa-location-dot", desc: "Setoran sampah pertamamu", unlocked: true },
  { id: "a2", name: "Eco Starter", icon: "fa-seedling", desc: "Mengumpulkan 100 GP pertama", unlocked: true },
  { id: "a3", name: "Pejuang Plastik", icon: "fa-shield-halved", desc: "Menyetor 50 botol plastik", unlocked: true },
  { id: "a4", name: "Pahlawan Komunitas", icon: "fa-users", desc: "Ikut 3 tantangan komunitas", unlocked: false },
  { id: "a5", name: "Pembuat Dampak", icon: "fa-chart-line", desc: "Memulihkan 25 kg sampah", unlocked: true },
  { id: "a6", name: "Juara Konsisten", icon: "fa-fire", desc: "Streak aktif 14 hari", unlocked: true },
];

// Linimasa perjalanan
const journeyTimeline = [
  { title: "Bergabung dengan RE:GEN", date: "2 Apr 2026", done: true },
  { title: "Drop Pertama", date: "5 Apr 2026", done: true },
  { title: "100 GP", date: "12 Apr 2026", done: true },
  { title: "500 GP", date: "3 Mei 2026", done: true },
  { title: "Juara Komunitas", date: "Sedang berjalan", done: false, current: true },
];

const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem("regen_" + key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem("regen_" + key, JSON.stringify(value)); } catch { }
  },
  clear(key) { try { localStorage.removeItem("regen_" + key); } catch { } },
};

const sessions = {
  isLoggedIn() { return !!store.get("user", null); },
  user() { return store.get("user", null); },
  login(u) { store.set("user", u); },
  logout() { store.clear("user"); },
};