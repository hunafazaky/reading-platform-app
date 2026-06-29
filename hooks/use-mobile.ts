import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Gunakan false sebagai default awal agar tidak perlu konversi !!isMobile di akhir
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      // Menggunakan mql.matches jauh lebih konsisten dengan API matchMedia
      setIsMobile(mql.matches);
    };

    mql.addEventListener("change", onChange);

    // Inisialisasi status awal saat komponen pertama kali dimuat
    onChange();

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
