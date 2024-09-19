import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
  className?: string;
}

export const AddressInput: FC<Props> = ({ className, onChange }) => {
  return (
    <div className={cn('', className)}>
      <AddressSuggestions
        token={'b5b8bb983ddcd08648080e0271d9dd367bb7aa65'}
        onChange={data => onChange?.(data?.value)}
      />
    </div>
  );
};
