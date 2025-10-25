# Nasıl Kullanılır? (How to Use) Feature

## Overview
Learnify platformuna kapsamlı bir "Nasıl Kullanılır?" dokümantasyon sayfası eklendi. Bu sayfa, kullanıcıların platforma ilk giriş yaptıklarında tüm özellikleri kolayca öğrenmelerini sağlar.

## Eklenen Özellikler

### 1. **Yeni Sayfa: `/dashboard/how-to-use`**
Lokasyon: `/src/app/dashboard/how-to-use/page.tsx`

Kapsamlı bir rehber sayfası içerir:
- **Hoş Geldin Banner**: Platform hakkında genel bilgi
- **Hızlı Başlangıç Rehberi**: 4 adımlı görsel rehber
  1. Doküman Yükleyin
  2. AI İle Analiz Edin
  3. Hızlı Okuyun
  4. Test Çözün

- **Özellik Detayları**: Her özellik için detaylı açıklamalar
  - 📄 Doküman Yönetimi
  - ⚡ Hızlı Okuma (RSVP)
  - ❓ Testler ve Sınavlar
  - 🎴 Bilgi Kartları (Flashcards)
  - 🏆 Oyunlaştırma ve Seriler

- **En İyi Kullanım İpuçları**: 4 temel ipucu kartı
  - Düzenli Çalışma
  - Doğru Hız
  - Aktif Tekrar
  - Organize Olun

- **Sık Sorulan Sorular (FAQ)**: 4 temel soru
  - RSVP nedir?
  - AI nasıl test oluşturuyor?
  - Hangi dosya formatları destekleniyor?
  - Günlük seri nasıl korunur?

- **Call-to-Action**: Kullanıcıları ilk dokümanı yüklemeye yönlendiren bölüm

### 2. **Sidebar Güncellemesi**
Lokasyon: `/src/app/dashboard/layout.tsx`

- Flashcards bölümünün altına yeni bir "Yardım" (Help) bölümü eklendi
- Ayırıcı çizgi ile diğer menü öğelerinden ayrıldı
- "Nasıl Kullanılır?" (How to Use) linki Info ikonu ile eklendi

### 3. **Ek Placeholder Sayfaları**

#### Fast Reading Sayfası
Lokasyon: `/src/app/dashboard/fast-reading/page.tsx`
- RSVP teknolojisi hakkında bilgi
- Ayarlanabilir WPM (kelime/dakika) slider
- "Yakında Geliyor" mesajı ile kullanıcı beklentisi yönetimi
- 3 ipucu kartı

#### Quizzes Sayfası
Lokasyon: `/src/app/dashboard/quizzes/page.tsx`
- Mock test verileri ile örnek arayüz
- İstatistik kartları (Tamamlanan, Ortalama Skor, Toplam Soru)
- Test listeleme ve progress gösterimi
- 4 test çözme ipucu kartı

## Teknik Detaylar

### Kullanılan Komponentler
- `Button`, `Progress`, `Slider` - shadcn/ui bileşenleri
- `lucide-react` ikonlar
- Responsive tasarım (mobile-first)
- Dark mode desteği

### Stil Özellikleri
- Gradient arka planlar (mavi tonları)
- Hover efektleri
- Border animasyonları
- Card-based layout
- Icon-driven navigation

### Responsive Davranış
- Mobile: Tek sütun layout
- Tablet: 2 sütun grid
- Desktop: 3-4 sütun grid

## Kullanıcı Akışı

1. Kullanıcı dashboard'a giriş yapar
2. Sol sidebar'da "Nasıl Kullanılır?" linkini görür
3. Linke tıklar ve rehber sayfasına yönlendirilir
4. Tüm özellikleri öğrenir
5. İlgili özellik sayfalarına doğrudan link'lerle gidebilir
6. CTA butonu ile doküman yükleme sayfasına yönlendirilir

## Gelecek İyileştirmeler

- [ ] Video tutoriallar eklenebilir
- [ ] Interaktif tour (onboarding) eklenebilir
- [ ] Daha fazla örnek senaryolar
- [ ] Kullanıcı geri bildirimleri bölümü
- [ ] Arama fonksiyonalitesi dokümantasyon içinde
- [ ] Çoklu dil desteği (İngilizce vs.)

## Ekran Görüntüleri için Test

Development server çalıştırıp aşağıdaki URL'leri test edin:
- `http://localhost:3000/dashboard/how-to-use`
- `http://localhost:3000/dashboard/fast-reading`
- `http://localhost:3000/dashboard/quizzes`

## Değişiklik Özeti

```bash
# Yeni dosyalar
src/app/dashboard/how-to-use/page.tsx
src/app/dashboard/fast-reading/page.tsx
src/app/dashboard/quizzes/page.tsx
docs/HOW_TO_USE_FEATURE.md

# Değişen dosyalar
src/app/dashboard/layout.tsx
```

## Commit Mesajı Önerisi
```
feat: Add comprehensive "How to Use" documentation page

- Added /dashboard/how-to-use page with step-by-step guide
- Updated sidebar with Help section and new navigation link
- Created placeholder pages for fast-reading and quizzes
- Includes feature details, best practices, and FAQ
- Fully responsive with dark mode support
- All links functional with proper navigation
```

---
**Oluşturma Tarihi**: 25 Ekim 2025
**Durum**: ✅ Tamamlandı

