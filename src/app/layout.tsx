import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROJETO YF",
  description: "Sistema de Controle Empresarial - Gestão completa de sinistros e salvados.",
  manifest: "/manifest.json",
  themeColor: "#BC002D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
