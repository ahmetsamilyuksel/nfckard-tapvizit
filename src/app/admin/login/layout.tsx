import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Girişi | NFC Kart",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
