"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

interface Prop {
  children: React.ReactNode;
}

export default function DarkProvider({ children }: Prop) {
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
