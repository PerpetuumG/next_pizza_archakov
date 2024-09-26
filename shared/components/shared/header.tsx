'use client';

import React, { FC, useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import {
  AuthModal,
  CartButton,
  Container,
  ProfileButton,
  SearchInput,
} from '@/shared/components/shared';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { router } from 'next/client';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 300,
        });
      }, 1000);
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
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
