import React, { FC } from 'react';
import { CheckoutItem, WhiteBlock } from '@/shared/components/shared';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { cn } from '@/shared/lib/utils';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  className?: string;
}

export const CheckoutCart: FC<Props> = ({
  className,
  onClickCountButton,
  removeCartItem,
  items,
}) => {
  return (
    <WhiteBlock title={'1. Корзина'} className={cn('', className)}>
      <div className={'flex flex-col gap-5'}>
        {items.map(item => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            details={getCartItemDetails(
              item.ingredients,
              item.pizzaType as PizzaType,
              item.pizzaSize as PizzaSize,
            )}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            disabled={item.disabled}
            onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
            onClickRemove={() => removeCartItem(item.id)}
          />
        ))}
      </div>
    </WhiteBlock>
  );
};
