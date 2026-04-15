# 🏥 Rawat Inap App (Frontend Test)

Aplikasi sederhana untuk mengelola data pasien rawat inap. Dibuat menggunakan **Next.js + TypeScript + TailwindCSS + shadcn/ui** sebagai bagian dari technical test frontend.

---

## 🚀 Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **TailwindCSS**
* **shadcn/ui**
* **Zustand (State Management)**

---

## ✨ Fitur Utama

### 1. 📋 Dashboard Pasien

* Menampilkan daftar pasien rawat inap
* Data menggunakan mock (simulasi API dengan delay 500ms)
* Fitur:

  * 🔍 Search berdasarkan Nama / NIK
  * 📄 Pagination (client-side)
  * ⏳ Loading state
  * 📭 Empty state

---

### 2. ➕ Tambah Pasien

* Form input data pasien:

  * Nama
  * NIK
  * Diagnosa
  * Tanggal Masuk
  * Dokter Penanggung Jawab
  * Ruangan
* Validasi form:

  * Field required
  * NIK harus 16 digit
* Setelah submit:

  * Data langsung masuk ke tabel (state global)
  * Redirect ke dashboard

---

## 📌 Catatan

* Data pasien disimpan menggunakan state management (Zustand)
* Data **tidak persisten setelah refresh** karena menggunakan mock (tanpa backend / database)
* Loading state disimulasikan dengan delay 500ms

---

## 🎯 Scope & Pertimbangan

Aplikasi ini dibuat sesuai dengan kebutuhan **technical test level junior**, dengan fokus pada:

* Struktur code yang rapi
* Penggunaan TypeScript
* Reusable component
* State management sederhana
* UX dasar (loading, empty state, validation)

---
