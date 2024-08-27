import React from 'react';

export const metadata = {
  title: 'Next.js',
  description: 'Dashboard',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={'en'}>
      <body>{children}</body>
    </html>
  );
}
