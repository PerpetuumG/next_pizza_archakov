import React, { FC } from 'react';
import { FormTextarea, WhiteBlock } from '@/shared/components/shared';
import { Input } from '@/shared/components/ui';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title={'3. Адрес доставки'}>
      <div className={'flex flex-col gap-5'}>
        <Input name={'firstName'} className={'text-base'} placeholder={'Адрес доставки'} />
        <FormTextarea
          name={'comment'}
          className={'text-base'}
          rows={5}
          placeholder={'Комментарий к заказу'}
        />
      </div>
    </WhiteBlock>
  );
};
