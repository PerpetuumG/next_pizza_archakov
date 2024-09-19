'use client';

import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components/shared';
import { useCart } from '@/shared/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutFormSchema } from '@/shared/components/shared/checkout/checkout-form-schema';

export default function CheckoutPage() {
  const { items, totalAmount, updateItemQuantity, removeCartItem } = useCart();

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className={'mt-10'}>
      <Title text={'Оформление заказа'} className={'font-extrabold mb-8 text-[36px]'}></Title>

      <div className={'flex gap-10'}>
        {/* Левый блок */}
        <div className={'flex flex-col gap-10 flex-1 mb-20'}>
          <CheckoutCart
            items={items}
            onClickCountButton={onClickCountButton}
            removeCartItem={removeCartItem}
          />

          <CheckoutPersonalForm />

          <CheckoutAddressForm />
        </div>

        {/* Правый блок */}
        <div className={'w-[450px]'}>
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
