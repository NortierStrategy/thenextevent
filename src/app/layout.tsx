import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-black" style={{ backgroundColor: "#0A0A0A" }}>
      <body className="font-outfit antialiased bg-black text-text">{children}</body>
    </html>
  );
}
