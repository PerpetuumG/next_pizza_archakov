import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import { ProductCard, Title } from '@/components/shared';

interface Props {
  title: string;
  items: any[];
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
  return (
    <div className={cn('', className)}>
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
            />
          ))}
      </div>
    </div>
  );
};
