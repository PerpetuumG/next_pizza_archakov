import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import { ProductWithRelations } from '@/@types/prisma';
import { PizzaImage } from '@/shared/components/shared/pizza-image';
import { GroupVariants } from '@/shared/components/shared/group-variants';
import { pizzaSizes } from '@/shared/constants/pizza';

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients?: ProductWithRelations[];
  items?: ProductWithRelations[];
  onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAdd,
}) => {
  const textDetails = '30 см, традиционное тесто 30';
  const totalPrice = 350;
  const size = 30;

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
        <Title text={name} size={'md'} className={'font-extrabold mb-1'} />

        <p className={'text-gray-400'}>{textDetails}</p>

        <GroupVariants items={pizzaSizes} />

        <Button
          // loading={loading}
          // onClick={handleClickAdd}
          className={'h-[55px] px-10 text-base rounded-[18px] w-full mt-10'}
        >
          Добавить в корзину за {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
