import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';

interface Props {
  className?: string;
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: FC<Props> = ({ className, orderId, items }) => {
  return (
    <div className={cn('', className)}>
      <h1>Спасибо за покупку!</h1>

      <p>Ваш заказ №{orderId} оплачен. Список товаров:</p>

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.productItem.product.name} | {item.productItem.price}$ x {item.quantity} шт. ={' '}
            {item.productItem.price * item.quantity}$
          </li>
        ))}
      </ul>
    </div>
  );
};
