import React, { FC, PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { ArrowRight } from 'lucide-react';

interface Props {
  className?: string;
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className={'flex flex-col justify-between pb-0 bg-[#f4f1ee]'}>
        <SheetHeader>
          <SheetTitle>
            В корзине <span className={'font-bold'}>3</span> товара
          </SheetTitle>
        </SheetHeader>

        {/* Items */}

        <SheetFooter className={'-mx-6 bg-white p-8'}>
          <div className={'w-full'}>
            <div className={'flex mb-4'}>
              <span className={'flex flex-1 text-lg text-neutral-500'}>
                Итого
                <div
                  className={
                    'flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'
                  }
                ></div>
              </span>

              <span className={'font-bold text-lg'}>1000 $</span>
            </div>

            <Link href={'/cart'}>
              <Button
                // onClick={() => setRedirecting(true)}
                // loading={loading || redirecting}
                type={'submit'}
                className={'w-full h-12 text-base'}
              >
                Оформить заказ
                <ArrowRight className={'w-5 ml-2'} />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
