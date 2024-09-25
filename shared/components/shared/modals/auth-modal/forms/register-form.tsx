import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export const RegisterForm: FC<Props> = ({ className }) => {
  return <div className={cn('', className)}></div>;
};
