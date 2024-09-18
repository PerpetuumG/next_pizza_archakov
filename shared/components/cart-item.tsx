import React, { FC } from 'react';
import { CartItemProps } from '@/shared/components/shared/cart-item-details/cart-item-details.types';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import * as CartItemDetails from '@/shared/components/shared/cart-item-details';

interface Props extends CartItemProps {
  onClickRemove: () => void;
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  className?: string;
}

export const CartItem: FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className={'flex items-center gap-5 flex-1'}>
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className={'flex items-center gap-5 ml-20'}>
        <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
        <button onClick={onClickRemove}>
          <X className={'text-gray-400 cursor-pointer hover:text-gray-600'} size={20} />
        </button>
      </div>
    </div>
  );
};
