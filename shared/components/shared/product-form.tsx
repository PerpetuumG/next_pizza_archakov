'use client';

import React, { FC } from 'react';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '@/shared/components/shared/choose-pizza-form';
import { ChooseProductForm } from '@/shared/components/shared/choose-product-form';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: FC<Props> = ({ product, onSubmit: _onSubmit, className }) => {
  const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading]);

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(`${product.name} добавлена в корзину`);

      _onSubmit?.()
    } catch (e) {
      toast.error(`Не удалось добавить ${product.name} в корзину`);
      console.error(e);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      name={product.name}
      imageUrl={product.imageUrl}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
