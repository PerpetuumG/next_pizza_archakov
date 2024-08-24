'use client';

import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import { Title } from '@/components/shared/title';
import { FilterCheckbox, RangeSlider } from '@/components/shared';
import { Input } from '@/components/ui';
import CheckboxFiltersGroup from '@/components/shared/checkbox-filters-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();
  const items = ingredients.map(item => ({ value: String(item.id), text: String(item.name) }));

  return (
    <div className={cn('', className)}>
      <Title text={'Фильтрация'} size={'sm'} className={'mb-5 font-bold'} />

      {/* Верхние чекбоксы */}
      <div className={'flex flex-col gap-4'}>
        <FilterCheckbox name={'qwe1'} text={'Можно собирать'} value={'1'} />
        <FilterCheckbox name={'qwe2'} text={'Новинки'} value={'2'} />
      </div>

      {/* Фильтр цен */}
      <div className={'mt-5 border-y border-y-neutral-100 py-6 pb-7'}>
        <p className={'font-bold mb-3'}>Цена от и до:</p>
        <div className={'flex gap-3 mb-5'}>
          <Input type={'number'} placeholder={'0'} min={0} max={1000} defaultValue={0} />
          <Input type={'number'} placeholder={'1000'} min={100} max={1000} />
        </div>

        {/* Полоса цены */}
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
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
        selectedIds={selectedIds}
      />
    </div>
  );
};
