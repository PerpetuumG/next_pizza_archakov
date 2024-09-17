'use client';

import React, { FC, useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { cn } from '@/shared/lib/utils';
import { ProductCard, Title } from '@/shared/components/shared';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: FC<Props> = ({
  title,
  items,
  className,
  listClassName,
  categoryId,
}) => {
  // Начало
  const setActiveCategoryId = useCategoryStore(state => state.setActiveId);
  // В зависимости от нахождения категории будет в меню и категории одновременно отображаться всё
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);
  // Конец

  return (
    <div className={cn('', className)} id={title} ref={intersectionRef}>
      <Title text={title} size={'lg'} className={'font-extrabold mb-5'} />

      <div className={cn('grid grid-cols-3 gap-[50px]', className)}>
        {items
          // .filter(item => item.items.length > 0)
          .map((product, id) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.items[0].price}
              imageUrl={product.imageUrl}
              ingredients={product.ingredients}
            />
          ))}
      </div>
    </div>
  );
};
