'use client';

import React, { FC, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { CartButton, Container, ProfileButton, SearchInput } from '@/shared/components/shared';
import Image from 'next/image';
import { Button } from '@/shared/components/ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession, signIn } from 'next-auth/react';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has('paid')) {
      setTimeout(() => {
        toast.success('Заказ успешно оплачен! Информация отправлена на почту.');
      }, 500);
    }
  }, []);
  return (
    <header className={cn('border-b', className)}>
      <Container className={'flex items-center justify-between py-8 '}>
        {/* Левая часть */}
        <Link href={'/'}>
          <div className={'flex items-center gap-4'}>
            <Image src={'/logo.png'} alt={'Logo'} width={35} height={35} />
            <div>
              <h1 className={'text-2xl uppercase font-black'}>Next Pizza</h1>
              <p className={'text-sm text-gray-400 leading-3'}>вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {/* Центральная часть */}
        {hasSearch && (
          <div className={'mx-10 flex-1'}>
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className={'flex items-center gap-3'}>
          <ProfileButton />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
