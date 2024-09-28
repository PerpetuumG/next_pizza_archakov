'use client';

import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { ClearButton, ErrorText, RequiredSymbol } from '@/shared/components/shared';
import { Input } from '@/shared/components/ui';
import { useFormContext } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  clasName?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormInput: FC<Props> = ({ clasName, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={cn('', clasName)}>
      {label && (
        <p className={'font-medium mb-2'}>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className={'relative'}>
        <Input className={'h-12 text-md'} {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className={'mt-2'} />}
    </div>
  );
};
