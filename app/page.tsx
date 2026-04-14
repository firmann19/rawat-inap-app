"use client";

import Link from "next/link";
import { useState } from "react";
import { usePasien } from "@/hooks/usePasien";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, User, Calendar, Stethoscope } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const { data, loading } = usePasien();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = data.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.nik.includes(search),
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginatedData = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    // Menggunakan text-base (16px) sebagai standar, bukan text-sm (14px)
    <div className="container mx-auto p-8 max-w-7xl space-y-8 text-base">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Data Pasien
          </h1>
          <p className="text-lg text-muted-foreground mt-1">
            Kelola informasi pasien rawat inap dan diagnosa.
          </p>
        </div>
        <Link href="/pasien/create">
          <Button className="shadow-md gap-2 h-12 px-6 text-base">
            <Plus className="w-5 h-5" /> Tambah Pasien
          </Button>
        </Link>
      </div>

      <Card className="shadow-lg border-slate-200">
        <CardHeader className="pb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Cari Nama atau NIK..."
              className="pl-12 h-12 text-base"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="py-20 text-center animate-pulse text-xl text-muted-foreground">
              Memuat data pasien...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed rounded-xl">
              <p className="text-lg text-muted-foreground">
                Tidak ada data pasien ditemukan
              </p>
            </div>
          ) : (
            <div className="rounded-xl border shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow className="h-14">
                    <TableHead className="font-bold text-slate-900 text-base px-6">
                      Nama Pasien
                    </TableHead>
                    <TableHead className="font-bold text-slate-900 text-base">
                      NIK
                    </TableHead>
                    <TableHead className="font-bold text-slate-900 text-base">
                      Diagnosa
                    </TableHead>
                    <TableHead className="font-bold text-slate-900 text-base">
                      Tanggal Masuk
                    </TableHead>
                    <TableHead className="font-bold text-slate-900 text-base">
                      Dokter
                    </TableHead>
                    <TableHead className="font-bold text-slate-900 text-base text-right px-6">
                      Ruangan
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedData.map((p) => (
                    <TableRow
                      key={p.id}
                      className="hover:bg-slate-50/50 transition-colors h-16"
                    >
                      <TableCell className="font-semibold px-6 text-base">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          {p.nama}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 text-base font-mono">
                        {p.nik}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="px-3 py-1 text-sm font-medium"
                        >
                          {p.diagnosa}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-base text-slate-600">
                          <Calendar className="w-4 h-4" /> {p.tanggalMasuk}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-base font-medium">
                          <Stethoscope className="w-4 h-4 text-blue-500" />
                          {p.dokter}
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 text-sm font-bold"
                        >
                          {p.ruangan}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8">
            <p className="text-base text-muted-foreground">
              Menampilkan{" "}
              <span className="font-bold text-slate-900">
                {paginatedData.length}
              </span>{" "}
              dari{" "}
              <span className="font-bold text-slate-900">
                {filtered.length}
              </span>{" "}
              pasien
            </p>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="h-10 px-4 text-base"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <div className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-bold border border-slate-200">
                {page} / {totalPages || 1}
              </div>
              <Button
                variant="outline"
                className="h-10 px-4 text-base"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
