import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TODO LIST',
  description: 'A simple TODO list app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white overflow-x-hidden">{children}</body>
    </html>
  );
}
