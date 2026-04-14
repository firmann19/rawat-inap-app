"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePasienStore } from "@/hooks/usePasienStore";
import { v4 as uuidv4 } from "uuid";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, Save, XCircle } from "lucide-react";

export default function CreatePasienPage() {
  const router = useRouter();
  const { addPasien } = usePasienStore();

  const [form, setForm] = useState({
    nama: "",
    nik: "",
    diagnosa: "",
    tanggalMasuk: "",
    dokter: "",
    ruangan: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const err: Record<string, string> = {};

    if (!form.nama) err.nama = "Nama wajib diisi";
    if (form.nik.length !== 16) err.nik = "NIK harus 16 digit";
    if (!form.diagnosa) err.diagnosa = "Diagnosa wajib diisi";
    if (!form.tanggalMasuk) err.tanggalMasuk = "Tanggal masuk wajib diisi";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    addPasien({
      id: uuidv4(),
      ...form,
    });

    router.push("/");
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl space-y-6 text-base">
      <Button
        variant="secondary"
        onClick={() => router.push("/")}
        className="gap-2 px-4 h-10 text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-200 transition-all"
      >
        <ArrowLeft className="w-5 h-5" /> Kembali ke Daftar
      </Button>

      <Card className="shadow-lg border-slate-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Tambah Pasien Baru
          </CardTitle>
          <CardDescription className="text-lg">
            Masukkan detail informasi pasien untuk pendaftaran rawat inap.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Nama */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="nama" className="text-base font-semibold">
                Nama Lengkap
              </Label>
              <Input
                id="nama"
                placeholder="Masukkan nama lengkap pasien"
                className={`h-12 text-base ${errors.nama ? "border-red-500" : ""}`}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
              {errors.nama && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.nama}
                </p>
              )}
            </div>

            {/* Input NIK */}
            <div className="space-y-2">
              <Label htmlFor="nik" className="text-base font-semibold">
                NIK (16 Digit)
              </Label>
              <Input
                id="nik"
                placeholder="320..."
                maxLength={16}
                className={`h-12 text-base ${errors.nik ? "border-red-500" : ""}`}
                onChange={(e) => setForm({ ...form, nik: e.target.value })}
              />
              {errors.nik && (
                <p className="text-red-500 text-sm font-medium">{errors.nik}</p>
              )}
            </div>

            {/* Input Tanggal */}
            <div className="space-y-2">
              <Label htmlFor="tanggal" className="text-base font-semibold">
                Tanggal Masuk
              </Label>
              <Input
                id="tanggal"
                type="date"
                className="h-12 text-base"
                onChange={(e) =>
                  setForm({ ...form, tanggalMasuk: e.target.value })
                }
              />
              {errors.tanggalMasuk && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.tanggalMasuk}
                </p>
              )}
            </div>

            {/* Input Diagnosa */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="diagnosa" className="text-base font-semibold">
                Diagnosa
              </Label>
              <Input
                id="diagnosa"
                placeholder="Keluhan atau penyakit pasien"
                className={`h-12 text-base ${errors.diagnosa ? "border-red-500" : ""}`}
                onChange={(e) => setForm({ ...form, diagnosa: e.target.value })}
              />
              {errors.diagnosa && (
                <p className="text-red-500 text-sm font-medium">
                  {errors.diagnosa}
                </p>
              )}
            </div>

            {/* Input Dokter */}
            <div className="space-y-2">
              <Label htmlFor="dokter" className="text-base font-semibold">
                Dokter Penanggung Jawab
              </Label>
              <Input
                id="dokter"
                placeholder="Contoh: Dr. Andi"
                className="h-12 text-base"
                onChange={(e) => setForm({ ...form, dokter: e.target.value })}
              />
            </div>

            {/* Input Ruangan */}
            <div className="space-y-2">
              <Label htmlFor="ruangan" className="text-base font-semibold">
                Ruangan
              </Label>
              <Input
                id="ruangan"
                placeholder="Contoh: A101"
                className="h-12 text-base"
                onChange={(e) => setForm({ ...form, ruangan: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleSubmit}
              className="flex-1 h-12 text-lg gap-2 shadow-md bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-5 h-5" /> Simpan Data
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="flex-1 h-12 text-lg gap-2"
            >
              <XCircle className="w-5 h-5 text-red-500" /> Batal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
