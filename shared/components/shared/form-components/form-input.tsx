import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { RequiredSymbol } from '@/shared/components/shared';
import { Input } from '@/shared/components/ui';
import {useFormContext} from "react-hook-form";

interface Props {
  clasName?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormInput: FC<Props> = ({ clasName, name, label, required, ...props }) => {
  const {} = useFormContext()

    return (
    <div className={cn('', clasName)}>
      {label && (
        <p className={'font-medium mb-2'}>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className={'relative'}>
        <Input className={'h-12 text-md'} {...props} />


      </div>

        {}
    </div>
  );
};
