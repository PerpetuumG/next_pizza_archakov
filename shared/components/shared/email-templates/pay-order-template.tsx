import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: FC<Props> = ({ className, orderId, totalAmount, paymentUrl }) => {
  return (
    <div className={cn('', className)}>
      <h1>Заказ № {orderId}</h1>

      <p>
        Оплатите заказ на сумму <b>{totalAmount}$</b>. Перейдите
        <a href={paymentUrl}>по этой ссылке </a> для оплаты заказа.
      </p>
    </div>
  );
};
