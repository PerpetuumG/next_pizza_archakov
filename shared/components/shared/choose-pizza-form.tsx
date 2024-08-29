'use client';

import React, { FC, useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import { PizzaImage } from '@/shared/components/shared/pizza-image';
import { GroupVariants } from '@/shared/components/shared/group-variants';
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from '@/shared/components/shared/ingredient-item';
import { useSet } from 'react-use';
import { calcTotalPizzaPrice, getAvailablePizzaSizes } from '@/shared/lib';

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAddCart,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);

  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  const availablePizzaSizes = getAvailablePizzaSizes(type, items);

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      item => Number(item.value) === size && !item.disabled,
    );
    const availableSizes = availablePizzaSizes?.find(item => !item.disabled);

    if (!isAvailableSize && availableSizes) {
      setSize(Number(availableSizes.value) as PizzaSize);
    }
  }, [type]);

  const handleClickAdd = () => {
    onClickAddCart?.();
  };

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
        <Title text={name} size={'md'} className={'font-extrabold mb-1'} />

        <p className={'text-gray-400'}>{textDetails}</p>

        <div className={'flex flex-col gap-4 mt-5'}>
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={value => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={value => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className={'bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'}>
          <div className={'grid grid-cols-3 gap-3'}>
            {ingredients.map(ingredient => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          // loading={loading}
          onClick={handleClickAdd}
          className={'h-[55px] px- 10 text-base rounded-[18px] w-full mt-10'}
        >
          Добавить в корзину за {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
