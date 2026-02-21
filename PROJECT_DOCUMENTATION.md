# NFC Kartvizit - vizit.life

## Proje Tam Dokumantasyonu

> Bu dokuman, projenin A'dan Z'ye tum teknik ve is mantigi detaylarini icerir.
> Herhangi bir gelistiriciye veya AI asistanina verildiginde, proje hakkinda hicbir soru kalmadan calismasini saglar.

---

## 1. PROJE OZETI

**Proje Adi:** NFC Kartvizit (vizit.life)
**Amac:** NFC teknolojisi ile calisan dijital kartvizit olusturma, siparis etme ve paylasma platformu.
**Hedef Pazar:** Rusya (birincil), Turkiye, Avrupa
**Varsayilan Dil:** Rusca (ru)
**Canli URL:** https://nfckard-tapvizit.vercel.app
**Deploy Platformu:** Vercel

### Is Modeli
- Kullanici dijital kartvizitini tasarlar
- Online (sadece QR) veya fiziksel kart (PVC/Premium/Metal) siparis eder
- Fiziksel kart teslimati sadece Rusya'da yapilir
- Kartvizit bir URL uzerinden paylasilir, NFC kart ile telefona dokunularak acilir

---

## 2. TEKNOLOJI YIGINI

| Teknoloji | Versiyon | Kullanim Amaci |
|-----------|----------|----------------|
| Next.js | 14.2.35 | Full-stack React framework |
| React | 18 | UI bilesenler |
| TypeScript | 5 | Tip guvenligi |
| Tailwind CSS | 3.4.1 | Stil ve responsive tasarim |
| Prisma ORM | 5.22.0 | Veritabani islemleri |
| PostgreSQL | - | Veritabani (Vercel Postgres) |
| qrcode.react | 4.2.0 | QR kod olusturma |
| react-easy-crop | 5.5.6 | Fotograf kirpma |

---

## 3. DOSYA VE KLASOR YAPISI

```
nfckard-tapvizit/
├── prisma/
│   ├── schema.prisma              # Veritabani semasi (Card, Order, Admin)
│   └── migrations/                # Veritabani migrasyonlari
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (font, metadata)
│   │   ├── page.tsx               # Ana sayfa yonlendirme (/ -> /ru)
│   │   │
│   │   ├── [lang]/                # Dil bazli sayfalar (tr, en, ru)
│   │   │   ├── layout.tsx         # Header, footer, dil degistirici
│   │   │   ├── page.tsx           # Landing/ana sayfa
│   │   │   ├── create/
│   │   │   │   ├── page.tsx       # Kart olusturma sayfasi (server)
│   │   │   │   └── CreateCardClient.tsx  # Kart olusturma formu (client)
│   │   │   ├── a/[cardId]/
│   │   │   │   ├── page.tsx       # Dijital kart goruntuleme (server)
│   │   │   │   └── DigitalCard.tsx # Dijital kart bileseni (client)
│   │   │   ├── track/
│   │   │   │   ├── page.tsx       # Siparis takip sayfasi (server)
│   │   │   │   └── TrackClient.tsx # Siparis takip bileseni (client)
│   │   │   ├── about/page.tsx     # Hakkimizda sayfasi
│   │   │   ├── terms/page.tsx     # Kullanim kosullari
│   │   │   └── privacy/page.tsx   # Gizlilik politikasi
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx         # Admin layout
│   │   │   ├── login/
│   │   │   │   ├── layout.tsx     # Login layout (baslik gizle)
│   │   │   │   └── page.tsx       # Admin giris ekrani
│   │   │   ├── panel/page.tsx     # Admin ana panel
│   │   │   └── orders/
│   │   │       ├── layout.tsx     # Siparisler layout
│   │   │       ├── page.tsx       # Siparisler sayfasi (server)
│   │   │       └── AdminOrdersClient.tsx  # Siparis yonetimi (client)
│   │   │
│   │   ├── api/
│   │   │   ├── cards/route.ts     # POST: Kart + siparis olustur
│   │   │   ├── orders/[orderId]/route.ts  # GET: Takip, PATCH: Durum guncelle
│   │   │   ├── vcard/[cardId]/route.ts    # GET: vCard dosyasi indir
│   │   │   └── admin/
│   │   │       ├── init/route.ts         # POST: Ilk admin olustur
│   │   │       ├── login/route.ts        # POST: Admin giris
│   │   │       ├── logout/route.ts       # POST: Admin cikis
│   │   │       └── change-password/route.ts  # POST: Sifre degistir
│   │   │
│   │   └── fonts/                 # Yerel font dosyalari
│   │
│   ├── components/
│   │   ├── CardPreview.tsx        # Kart on izleme (8 farkli layout)
│   │   ├── PhotoCropper.tsx       # Fotograf yukleme ve kirpma
│   │   └── QRModal.tsx            # QR kod gosterme ve indirme
│   │
│   ├── lib/
│   │   ├── i18n.ts                # Cok dil destegi (200+ anahtar x 3 dil)
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── utils.ts               # Slug, fiyat, durum yardimci fonksiyonlar
│   │   ├── linkUtils.ts           # Sosyal medya link formatlama
│   │   └── phoneUtils.ts          # Telefon numarasi formatlama
│   │
│   ├── types/index.ts             # TypeScript arayuz tanimlari
│   └── middleware.ts              # Rota koruma ve i18n yonlendirme
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
├── vercel.json                    # Vercel yapilandirmasi
└── prisma.config.ts
```

---

## 4. VERITABANI SEMASI

### 4.1 Card (Kartvizit)

```prisma
model Card {
  id                String   @id @default(cuid())
  slug              String   @unique          // URL: /a/{slug}
  firstName         String                    // Zorunlu
  lastName          String                    // Zorunlu
  title             String?                   // Unvan
  company           String?                   // Sirket
  email             String?
  phone             String?                   // +7XXXXXXXXXX formati
  website           String?
  address           String?
  bio               String?                   // Hakkimda metni

  // Sosyal medya (15 alan)
  linkedin          String?
  twitter           String?
  instagram         String?
  whatsapp          String?                   // Telefon numarasi
  telegram          String?                   // @kullaniciadi
  vkontakte         String?
  max               String?  @map("vkmax")   // MAX mesajlasma
  tiktok            String?
  wechat            String?
  youtube           String?
  facebook          String?
  snapchat          String?

  // Rus e-ticaret platformlari
  wildberries       String?
  ozon              String?
  yandexmarket      String?

  // Tasarim
  theme             String   @default("dark")
  primaryColor      String   @default("#0ea5e9")
  backgroundColor   String?
  gradientIntensity Int?     @default(50)     // 0-100
  layout            String?  @default("classic")
  photoUrl          String?                   // Base64 data URL

  // Meta
  isActive          Boolean  @default(true)
  viewCount         Int      @default(0)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  order             Order?                    // 1:1 iliski
}
```

### 4.2 Order (Siparis)

```prisma
model Order {
  id              String   @id @default(cuid())
  cardId          String   @unique            // Kart ile 1:1
  quantity        Int      @default(1)
  cardType        String   @default("standard")  // online|standard|premium|metal
  status          String   @default("PENDING")
  totalPrice      Float
  currency        String   @default("RUB")    // RUB|TRY|EUR
  paymentMethod   String   @default("card")   // card|transfer|cash|online
  paymentStatus   String   @default("PENDING")
  paymentId       String?
  customerName    String
  customerEmail   String
  customerPhone   String?
  shippingAddress String                      // Online siparis icin "Online"
  notes           String?
  trackingNumber  String?                     // Kargo takip no
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  card            Card     @relation(fields: [cardId], references: [id])
}
```

### 4.3 Admin

```prisma
model Admin {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String                            // SHA-256 hash
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 5. API ROTLARI

### 5.1 POST /api/cards - Kart ve Siparis Olustur

**Istek Govdesi:**
```json
{
  "cardData": {
    "firstName": "Ahmet",       // ZORUNLU
    "lastName": "Yilmaz",       // ZORUNLU
    "title": "Yazilim Muhendisi",
    "company": "Tech Corp",
    "email": "ahmet@mail.com",
    "phone": "+79001234567",
    "website": "https://ahmet.dev",
    "linkedin": "ahmetyilmaz",
    "instagram": "@ahmet",
    "telegram": "@ahmet",
    "theme": "dark",
    "primaryColor": "#0ea5e9",
    "backgroundColor": "#ffffff",
    "gradientIntensity": 50,
    "layout": "classic",
    "photoUrl": "data:image/jpeg;base64,..."
  },
  "orderData": {
    "cardType": "standard",      // online|standard|premium|metal
    "quantity": 1,
    "customerName": "Ahmet Yilmaz",
    "customerEmail": "ahmet@mail.com",
    "customerPhone": "+79001234567",
    "shippingAddress": "Moskova, Rusya",
    "notes": "Ozel istek..."
  },
  "paymentMethod": "card",       // card|transfer|cash|online
  "currency": "RUB",
  "totalPrice": 500
}
```

**Basarili Yanit (200):**
```json
{
  "success": true,
  "cardId": "clx...",
  "slug": "ahmet-yilmaz-a1b2",
  "orderId": "clx..."
}
```

**Validasyon Kurallari:**
- `firstName` ve `lastName` zorunlu
- Fiziksel siparis: `customerName`, `customerEmail`, `shippingAddress` zorunlu
- Online siparis: sadece `customerEmail` zorunlu
- Slug: ad-soyad + 4 rastgele karakter, maks 10 deneme

### 5.2 GET /api/orders/[orderId] - Siparis Takip

**Yanit:**
```json
{
  "id": "clx...",
  "status": "PROCESSING",
  "cardType": "standard",
  "quantity": 1,
  "totalPrice": 500,
  "currency": "RUB",
  "paymentMethod": "card",
  "paymentStatus": "PENDING",
  "trackingNumber": null,
  "createdAt": "2026-02-21T...",
  "card": {
    "slug": "ahmet-yilmaz-a1b2",
    "firstName": "Ahmet",
    "lastName": "Yilmaz"
  }
}
```

### 5.3 PATCH /api/orders/[orderId] - Durum Guncelle (Admin)

**Istek:**
```json
{ "status": "SHIPPED" }
```
**Header:** `x-admin-key: admin123`

**Gecerli Durumlar:** PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED

### 5.4 GET /api/vcard/[cardId] - vCard Indir

- `cardId` = slug degeri
- RFC 3.0 uyumlu .vcf dosyasi dondurur
- Icerik: isim, unvan, sirket, telefon, email, web, adres, bio, foto (base64)
- Sosyal medya profilleri X-SOCIALPROFILE olarak eklenir
- Content-Type: `text/vcard`
- Dosya adi: `{firstName}-{lastName}.vcf`

### 5.5 Admin API'leri

| Rota | Metod | Aciklama |
|------|-------|----------|
| `/api/admin/init` | POST | Ilk admin olusturur (varsayilan: Ahmet123/Ahmet123) |
| `/api/admin/login` | POST | Giris yapar, 24 saatlik cookie olusturur |
| `/api/admin/logout` | POST | Cikis yapar, cookie siler |
| `/api/admin/change-password` | POST | Sifre degistirir (min 6 karakter) |

---

## 6. SAYFA ROTALARI VE AKISLAR

### 6.1 Ana Sayfa - `/{lang}`

**URL Ornekleri:** `/ru`, `/tr`, `/en`

**Icerik:**
1. Hero Section - Baslik, aciklama, CTA butonlari
2. Ozellikler - 6 ozellik karti (NFC, guncel bilgi, cevre dostu, vb.)
3. Nasil Calisir - 3 adim (Tasarla, Siparis Ver, Paylas)
4. Fiyatlandirma - 4 plan karti (Online/Standart/Premium/Metal)
5. SSS - 5 soru-cevap (accordion)
6. CTA Bandi - Son cagrisi
7. Footer - Linkler, iletisim

**Ozel:** Fiyat bolumunun altinda "Fiziksel kart teslimati sadece Rusya'da" uyarisi var.

### 6.2 Kart Olusturma - `/{lang}/create`

**2 Adimli Form:**

**Adim 1: Tasarim**
- Profil fotografi yukleme/kirpma
- Kart duzeni secimi (8 layout)
- Temel bilgiler (ad, soyad, unvan, sirket)
- Iletisim bilgileri (email, telefon, web, adres)
- Sosyal medya (15 platform)
- Hakkimda metni
- Tema secimi (8 tema)
- Renk secimi (ana renk + arka plan + gradient yogunlugu)

**Adim 2: Siparis**
- Kart tipi secimi (online/standart/premium/metal)
- Online secildiginde: sadece email sorulur, teslimat bilgileri gizlenir
- Fiziksel secildiginde: ad, email, telefon, adres, adet, odeme yontemi
- Onay checkbox'lari (zorunlu):
  - "Kullanim Kosullarini okudum ve kabul ediyorum"
  - "Gizlilik Politikasini okudum, onayliyorum"
- Toplam fiyat hesaplama

**Adim 3: Basari**
- QR kod gosterimi
- Kart URL'si
- Siparis numarasi
- "Karti Goruntule" ve "Siparis Takip" butonlari

### 6.3 Dijital Kart Goruntuleme - `/{lang}/a/{slug}`

- Secilen tema/layout ile kartvizit gosterimi
- Sayfa arka plani kart stiline uyumlu
- Goruntuleme sayaci otomatik artar
- Alt butonlar: Rehbere Ekle, QR Kod, Paylas
- Sosyal medya ikonlari tiklanabilir linklerle
- Responsive tasarim (mobil oncelikli)
- Header/footer gizlenir (tam ekran kart deneyimi)

### 6.4 Siparis Takip - `/{lang}/track`

- Siparis numarasi ile arama
- URL parametresi destegi: `?id=SIPARIS_NO`
- Gorsel durum ilerleme cubugu (5 adim)
- Siparis detaylari: musteri, kart, adet, fiyat, odeme durumu, kargo no
- Kartı goruntuleme linki

### 6.5 Admin Panel

| Rota | Aciklama |
|------|----------|
| `/admin/login` | Giris ekrani |
| `/admin/panel` | Ana panel (istatistikler, hizli erisim) |
| `/admin/orders` | Siparis yonetimi (tablo, filtreleme, durum degistirme) |

**Admin Siparis Yonetimi Ozellikleri:**
- Tum siparislerin tablo goruntuleme
- Istatistikler: toplam siparis, bekleyen, toplam gelir
- Durum filtresi (Tumu, Bekliyor, Onaylandi, vb.)
- Her siparis icin: durum degistir, URL kopyala, vCard indir, kart goruntule
- Siparis detay modali

---

## 7. COK DIL DESTEGI (i18n)

### 7.1 Desteklenen Diller

| Kod | Dil | Varsayilan |
|-----|-----|-----------|
| `ru` | Rusca | Evet (ana sayfa / yonlendirmesi) |
| `tr` | Turkce | Hayir |
| `en` | Ingilizce | Hayir |

### 7.2 Ceviri Yapisi

Ceviriler `src/lib/i18n.ts` dosyasinda, her dil icin 200+ anahtar barindiran obje olarak tutulur.

**Kapsam:**
- Site basliklari ve aciklamalari
- Form etiketleri ve placeholder'lar
- Hata mesajlari
- Tema, layout, kart tipi isimleri
- Sayfa icerikleri (SSS, hakkimizda, vb.)
- Admin panel metinleri
- Siparis durum etiketleri
- Onay metinleri ve yasal uyarilar

### 7.3 Dil Degistirme

Header'da TR | EN | RU butonlari bulunur. Tiklandiginda `/{yeniDil}` rotasina yonlendirilir.

---

## 8. FIYATLANDIRMA

### 8.1 Kart Tipleri ve Fiyatlar

| Tip | Rusya (RUB) | Turkiye (TRY) | Avrupa (EUR) | Aciklama |
|-----|-------------|---------------|--------------|----------|
| Online (QR) | 100₽ | 30₺ | €1 | Sadece dijital kart + QR, fiziksel kart yok |
| Standart (PVC) | 500₽ | 150₺ | €5 | PVC malzeme, standart NFC cip |
| Premium (Mat) | 850₽ | 250₺ | €9 | Mat laminasyon, gelismis NFC cip |
| Metal | 1700₽ | 500₺ | €18 | Premium metal, VIP NFC deneyimi |

### 8.2 Odeme Yontemleri

| Yontem | Rusya | Turkiye | Avrupa |
|--------|-------|---------|--------|
| Kredi/Banka Karti | Evet | Evet | Evet |
| Banka Havalesi | Evet | Evet | Evet |
| Kapida Odeme | Evet | Evet | Hayir |

**Not:** Online siparisler icin odeme yontemi secimi gosterilmez, `paymentMethod: "online"` olarak kaydedilir.

**Onemli:** Odeme entegrasyonu (Stripe, YooKassa vb.) henuz yapilmamistir. Siparisler manuel olarak takip edilir.

---

## 9. KART TASARIM SECENEKLERI

### 9.1 Temalar (8 adet)

| Tema | Gorsel | CSS Renkleri |
|------|--------|-------------|
| dark | Koyu arka plan | gray-900 -> gray-700 |
| light | Acik arka plan | white -> gray-100 |
| gradient | Renkli gecis | Kullanici rengi bazli |
| modern | Mavi-camgobegi | blue-500 -> cyan-500 |
| elegant | Gri tonlari | gray-800 -> gray-600 |
| minimal | Beyaz minimal | gray-100 -> gray-200 |
| vibrant | Turuncu-kirmizi | orange-500 -> red-500 |
| professional | Lacivert | indigo-600 -> blue-600 |

### 9.2 Kartvizt Duzenleri (8 adet)

| Layout | Aciklama |
|--------|----------|
| classic | Ust banner + ortalanmis foto + bilgiler |
| modern | Buyuk ust banner + bilgiler alt kisimda |
| sidebar | Sol panel (foto) + sag panel (bilgiler) |
| minimal | Kucuk foto + metin agirlikli |
| bold | Buyuk renkli baslik alani |
| stylish | Ikili panel kompozisyon |
| elegant | Yuvarlak foto + zarif yerlestirme |
| creative | Renkli ustluk + alt bilgi |

### 9.3 Renk Secenekleri

- 20 hazir renk paleti
- HTML5 renk secici (sinirsiz renk)
- Hex kodu ile elle giris
- Gradient ton secici (koyu-acik)
- Ayri arka plan rengi secimi
- Gradient yogunlugu: 0-100 arasi slider

---

## 10. SOSYAL MEDYA DESTEGI

### 10.1 Desteklenen Platformlar (15 adet)

| Platform | Alan Tipi | Link Formati |
|----------|-----------|-------------|
| LinkedIn | Kullanici adi | linkedin.com/in/{kullanici} |
| Twitter/X | @kullanici | twitter.com/{kullanici} |
| Instagram | @kullanici | instagram.com/{kullanici} |
| WhatsApp | Telefon no | wa.me/{numara} |
| Telegram | @kullanici | t.me/{kullanici} |
| VKontakte | Kullanici adi | vk.com/{kullanici} |
| MAX | Kullanici adi | max.ru/{kullanici} |
| TikTok | @kullanici | tiktok.com/@{kullanici} |
| WeChat | Kullanici adi | weixin://dl/chat?{kullanici} |
| YouTube | @kanal | youtube.com/{kanal} |
| Facebook | Kullanici adi | facebook.com/{kullanici} |
| Snapchat | @kullanici | snapchat.com/add/{kullanici} |
| Wildberries | Magaza ID | wildberries.ru/seller/{id} |
| Ozon | Magaza ID | ozon.ru/seller/{id} |
| Yandex Market | Magaza ID | market.yandex.ru/shop/{id} |

### 10.2 Link Formatlama Mantigi

`src/lib/linkUtils.ts` dosyasi, kullanicinin girdigi ham metni otomatik olarak tiklanabilir URL'ye cevirir:
- `@ahmet` -> `https://instagram.com/ahmet`
- `ahmet` -> `https://instagram.com/ahmet`
- `https://instagram.com/ahmet` -> degistirmez (zaten tam URL)

---

## 11. FOTOGRAF ISLEMLERI

### 11.1 Yukleme

- **Desteklenen formatlar:** JPEG, PNG, WEBP, HEIC
- **Maks boyut:** 10MB
- **HEIC uyarisi:** iPhone kullanicilari icin otomatik uyari gosterilir
- Dosya secme veya surukleme destegi

### 11.2 Kirpma

- `react-easy-crop` kutuphanesi kullanilir
- **Zoom:** 1x - 3x arasi slider
- **Kirpma sekli:**
  - Daire: classic, sidebar, minimal layout'lari icin
  - Dikdortgen (16:9): modern layout icin
- **Cikti:** JPEG, %90 kalite, base64 data URL
- Orijinal foto saklanir, tekrar duzenleme mumkun

### 11.3 Depolama

- Fotograflar base64 olarak veritabaninda saklanir (`photoUrl` alani)
- Harici depolama servisi (S3, Cloudinary vb.) kullanilmaz
- **Not:** Buyuk fotograflar veritabanini buyutebilir

---

## 12. QR KOD OLUSTURMA

- **Kutuphane:** qrcode.react (SVG tabanli)
- **Boyut:** Ekranda 220x220px, indirmede 400x400px
- **Icerik:** Kartvizit URL'si (`/{lang}/a/{slug}`)
- **Indirme:** PNG formatinda, beyaz arka planli
- **Ozel:** Kart ana renginde cerceve

---

## 13. vCARD OLUSTURMA

### 13.1 Format

- RFC 3.0 uyumlu
- Dosya uzantisi: `.vcf`
- Encoding: UTF-8

### 13.2 Icerdigi Alanlar

```vcard
BEGIN:VCARD
VERSION:3.0
FN:Ahmet Yilmaz
N:Yilmaz;Ahmet;;;
TITLE:Yazilim Muhendisi
ORG:Tech Corp
PHOTO;ENCODING=b;TYPE=JPEG:{base64_data}
TEL;TYPE=CELL:{telefon}
EMAIL:{email}
URL:{website}
ADR;TYPE=WORK:;;{adres};;;;
NOTE:{bio}
X-SOCIALPROFILE;TYPE=instagram:{url}
X-SOCIALPROFILE;TYPE=telegram:{url}
... (tum sosyal medya)
X-DIGITALCARD:{kart_url}
END:VCARD
```

---

## 14. MIDDLEWARE VE GUVENLIK

### 14.1 Middleware Isleyisi (`src/middleware.ts`)

```
Istek geldi
  ├── /api/* veya /_next/* -> Atla, devam et
  ├── /admin/* (login haric) -> Cookie kontrol, yoksa /admin/login'e yonlendir
  ├── /admin/login -> Cookie varsa /admin/panel'e yonlendir
  ├── /admin -> /admin/panel'e yonlendir
  ├── / (root) -> /ru'ya yonlendir (varsayilan dil)
  └── Diger -> x-pathname header'i ekle, devam et
```

### 14.2 Admin Guvenlik

| Ozellik | Detay |
|---------|-------|
| Sifre Hashleme | SHA-256 (salt yok) |
| Oturum | HttpOnly cookie, 24 saat sureli |
| Cookie Adi | `admin_session` |
| Cookie Ozellikleri | httpOnly, secure, sameSite=lax, path=/ |
| Varsayilan Hesap | Ahmet123 / Ahmet123 |
| API Koruma | `x-admin-key: admin123` header'i |

**Guvenlik Notlari:**
- Sifre hashlemede salt kullanilmiyor (gelistirilmeli)
- Admin API anahtari kodda sabit (environment variable'a tasinmali)
- Varsayilan sifre degistirilmeli

---

## 15. SIPARIS DURUMLARI VE AKISI

### 15.1 Durum Akisi

```
PENDING (Bekliyor)
  ↓
CONFIRMED (Onaylandi)
  ↓
PROCESSING (Hazirlaniyor)
  ↓
SHIPPED (Kargoya Verildi)
  ↓
DELIVERED (Teslim Edildi)

Herhangi bir asamada:
  → CANCELLED (Iptal Edildi)
```

### 15.2 Durum Renkleri (Admin Panel)

| Durum | Renk |
|-------|------|
| PENDING | Sari |
| CONFIRMED | Mavi |
| PROCESSING | Mor |
| SHIPPED | Lacivert |
| DELIVERED | Yesil |
| CANCELLED | Kirmizi |

---

## 16. ORTAM DEGISKENLERI

### 16.1 Gerekli Degiskenler

```env
# Veritabani (Vercel Postgres)
DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
DIRECT_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
```

### 16.2 Opsiyonel Degiskenler

```env
# Uygulama
NEXT_PUBLIC_BASE_URL="https://nfckard-tapvizit.vercel.app"
NODE_ENV="production"
```

---

## 17. VERCEL YAPILANDIRMASI

### 17.1 vercel.json

```json
{
  "buildCommand": "prisma generate && (prisma db push --accept-data-loss || true) && next build",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/admin/:path*",
      "destination": "/admin/:path*"
    }
  ]
}
```

### 17.2 Build Sureci

1. `prisma generate` - Prisma client olustur
2. `prisma db push --accept-data-loss || true` - DB semayi senkronize et (hata alsa bile devam et)
3. `next build` - Next.js uygulamasini derle

### 17.3 Gerekli Vercel Ayarlari

- **Framework:** Next.js
- **Node.js Version:** 18+
- **Environment Variables:** DATABASE_URL, DIRECT_URL (Vercel Postgres'ten otomatik)
- **Postgres:** Vercel Postgres eklentisi etkinlestirilmeli

---

## 18. YEREL GELISTIRME

### 18.1 Kurulum

```bash
# 1. Repo'yu klonla
git clone https://github.com/ahmetsamilyuksel/nfckard-tapvizit.git
cd nfckard-tapvizit

# 2. Bagimliliklari yukle
npm install

# 3. Ortam degiskenlerini ayarla
cp .env.example .env
# DATABASE_URL ve DIRECT_URL degerlerini gir

# 4. Veritabanini hazirla
npm run setup

# 5. Gelistirme sunucusunu baslat
npm run dev
```

### 18.2 Kullanilabilir Scriptler

| Komut | Aciklama |
|-------|----------|
| `npm run dev` | Gelistirme sunucusu (http://localhost:3000) |
| `npm run build` | Uretim derlemesi |
| `npm start` | Uretim sunucusu |
| `npm run lint` | ESLint kontrolu |
| `npm run db:push` | Prisma sema senkronizasyonu |
| `npm run db:studio` | Prisma Studio (veritabani GUI) |
| `npm run db:generate` | Prisma client yeniden olustur |
| `npm run setup` | Ilk kurulum (generate + db push) |

### 18.3 Ilk Admin Olusturma

Uygulama calistiktan sonra:
```bash
curl -X POST http://localhost:3000/api/admin/init
```
Bu, `Ahmet123` / `Ahmet123` kimlik bilgileriyle bir admin hesabi olusturur.

---

## 19. ONEMLI TEKNIK DETAYLAR

### 19.1 Slug Olusturma Mantigi

```typescript
// Turkce karakterler donusturulur
"Ahmet Güneş" -> "ahmet-gunes-x7k2"

// Donusum tablosu: ğ->g, ü->u, ş->s, ı->i, ö->o, ç->c
// Sonuna 4 rastgele karakter eklenir
// Benzersizlik icin maks 10 deneme yapilir
```

### 19.2 Telefon Numarasi Formatlama

**Desteklenen Ulke Kodlari:**
| Bayrak | Kod | Ulke |
|--------|-----|------|
| +7 | Rusya |
| +90 | Turkiye |
| +1 | ABD/Kanada |
| +44 | Ingiltere |
| +49 | Almanya |
| +33 | Fransa |
| +39 | Italya |
| +34 | Ispanya |
| +86 | Cin |

**Goruntuleme formati:** `(XXX) XXX XX XX`
**Depolama formati:** `+7XXXXXXXXXX` (tam numara)

### 19.3 Tema Renk Hesaplama

Kart on izlemede metin rengi, arka plan rengine gore otomatik hesaplanir:
```typescript
// Parlaklik hesaplamasi
const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
// luminance > 0.5 -> koyu metin (#000)
// luminance <= 0.5 -> acik metin (#fff)
```

### 19.4 Lazy Loading

- `PhotoCropper` bileseni lazy load edilir (`React.lazy`)
- Kullanici fotograf yuklemek istediginde yuklenir
- Yukleme sirasinda fallback spinner gosterilir

---

## 20. BILINEN KISITLAMALAR VE GELECEK GELISTIRMELER

### 20.1 Mevcut Kisitlamalar

| Kisitlama | Aciklama |
|-----------|----------|
| Odeme entegrasyonu yok | Siparisler manuel takip edilir |
| E-posta bildirimi yok | Siparis durumu degisikliginde bildirim gonderilmez |
| Fotograf depolama | Base64 olarak DB'de, harici storage yok |
| Salt'siz hash | Admin sifreleri SHA-256 salt olmadan hashlenir |
| Sabit API anahtari | Admin API anahtari kodda "admin123" olarak sabit |
| Envanter yonetimi yok | Stok takibi yapilmaz |
| Indirim/kupon yok | Promosyon sistemi mevcut degil |
| Analytics eksik | Admin panelinde "yakinda" etiketi |
| Kart duzenleme yok | Olusturulan kart sonradan degistirilemiyor |
| Tek admin | Coklu admin destegi yok |

### 20.2 Onerilen Gelistirmeler

1. **Odeme entegrasyonu** - YooKassa (Rusya), Stripe (uluslararasi)
2. **E-posta bildirimleri** - Siparis onay, kargo bilgisi
3. **Fotograf harici depolama** - Cloudinary veya S3
4. **Kart duzenleme** - Olusturulan karti guncelleme
5. **Coklu admin** - Rol bazli yetkilendirme
6. **Analytics** - Kart goruntuleme istatistikleri, grafikler
7. **Toplu siparis** - Sirketler icin toplu kart olusturma
8. **API anahtari** - Environment variable'a tasima
9. **bcrypt** - Sifre hashleme iyilestirmesi
10. **Teslimat bolge genisletme** - Turkiye ve Avrupa icin kargo

---

## 21. PROJE ILETISIM

- **Web:** vizit.life
- **E-posta:** info@vizit.life
- **GitHub:** github.com/ahmetsamilyuksel/nfckard-tapvizit

---

> Bu dokuman, projenin 21 Subat 2026 tarihindeki durumunu yansitmaktadir.
> Son guncelleme: 21.02.2026
