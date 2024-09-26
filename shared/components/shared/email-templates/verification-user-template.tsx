import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
  code: string;
}

export const VerificationUserTemplate: FC<Props> = ({ className, code }) => {
  return (
    <div className={cn('', className)}>
      <p>
        Код подтверждения: <h2>${code}</h2>
      </p>

      <p>
        <a href={`http://localhost:3000/api/auth/verify?code=${code}`}> Подтвердить регистрацию </a>
      </p>
    </div>
  );
};
