import React, { FC } from 'react';
import { ErrorText, FormTextarea, WhiteBlock } from '@/shared/components/shared';
import { AddressInput } from '@/shared/components/shared/address-input';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title={'3. Адрес доставки'} className={className}>
      <div className={'flex flex-col gap-5'}>
        <Controller
          control={control}
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
          name={'address'}
        />

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
