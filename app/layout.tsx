import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Markdown",
  description: "Convert PDF files to Markdown format with OCR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
