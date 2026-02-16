import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | NFC Kart",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
