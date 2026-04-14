import { Pasien } from "@/types/pasien";

const data: Pasien[] = [
  {
    id: "1",
    nama: "Budi Santoso",
    nik: "1234567890123456",
    diagnosa: "Demam",
    tanggalMasuk: "2026-04-10",
    dokter: "Dr. Andi",
    ruangan: "A101",
  },
];

export const fetchPasien = (): Promise<Pasien[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
};
