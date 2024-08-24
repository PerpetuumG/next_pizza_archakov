'use client';

import React, { FC, useState } from 'react';
import { cn } from '@/lib/utils';
import { Title } from '@/components/shared/title';
import { FilterCheckbox, RangeSlider } from '@/components/shared';
import { Input } from '@/components/ui';
import CheckboxFiltersGroup from '@/components/shared/checkbox-filters-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();

  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));

  const [prices, setPrice] = useState<PriceProps>({ priceFrom: 0, priceTo: 1000 });

  const items = ingredients.map(item => ({ value: String(item.id), text: String(item.name) }));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    });
  };

  return (
    <div className={cn('', className)}>
      <Title text={'Фильтрация'} size={'sm'} className={'mb-5 font-bold'} />

      {/* Верхние чекбоксы */}
      <CheckboxFiltersGroup
        title={'Размеры'}
        name={'sizes'}
        className={'mt-5'}
        onClickCheckbox={toggleSizes}
        selected={sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      {/* Фильтр цен */}
      <div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7'}>
        <p className={'font-bold mb-3'}>Цена от и до:</p>
        <div className={'flex gap-3 mb-5'}>
          <Input
            type={'number'}
            placeholder={'0'}
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            onClick={e => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type={'number'}
            placeholder={'1000'}
            min={100}
            max={1000}
            value={String(prices.priceTo)}
            onClick={e => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        {/* Полоса цены */}
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>

      {/* Список фильтров */}
      <CheckboxFiltersGroup
        title={'Ингридиенты'}
        name={'ingredients'}
        className={'mt-5'}
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selected={selectedIds}
      />
    </div>
  );
};
