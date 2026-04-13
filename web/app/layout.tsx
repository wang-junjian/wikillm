import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WikiLLM 知识库",
  description: "LLM-powered personal knowledge base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full bg-gray-50">{children}</body>
    </html>
  );
}
