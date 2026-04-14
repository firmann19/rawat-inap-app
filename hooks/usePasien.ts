import { useEffect, useState } from "react";
import { fetchPasien } from "@/data/mockPasien";
import { usePasienStore } from "./usePasienStore";

export function usePasien() {
  const { pasien, setPasien } = usePasienStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (pasien.length === 0) {
        const res = await fetchPasien();
        setPasien(res);
      }
      setLoading(false);
    };

    loadData();
  }, [setPasien]);

  return { data: pasien, loading };
}
