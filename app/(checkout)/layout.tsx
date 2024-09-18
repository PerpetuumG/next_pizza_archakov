import React from 'react';
import { Metadata } from 'next';
import { Container, Header } from '@/shared/components/shared';

export const metadata: Metadata = {
  title: 'Next Pizza | Корзина',
  description: 'Checkout',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={'min-h-screen bg-[#f4f1ee]'}>
      <Container>
        <Header hasSearch={false} hasCart={false} className={'border-b-gray-200'} />
        {children}
      </Container>
    </main>
  );
}
