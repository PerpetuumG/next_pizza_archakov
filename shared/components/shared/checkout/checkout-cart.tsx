import React, { FC } from 'react';
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '@/shared/components/shared';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { cn } from '@/shared/lib/utils';
import { CartStateItem } from '@/shared/lib/get-cart-details';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  className?: string;
  loading?: boolean;
}

export const CheckoutCart: FC<Props> = ({
  className,
  onClickCountButton,
  removeCartItem,
  items,
  loading,
}) => {
  return (
    <WhiteBlock title={'1. Корзина'} className={cn('', className)}>
      <div className={'flex flex-col gap-5'}>
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map(item => (
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
