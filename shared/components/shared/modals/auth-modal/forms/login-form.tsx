import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, TFormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormInput, Title } from '@/shared/components';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

interface Props {
  className?: string;
  onClose?: VoidFunction;
}

export const LoginForm: FC<Props> = ({ className, onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: 'V',
      });

      onClose?.();
    } catch (e) {
      console.error('Error [LOGIN]', e);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn('flex justify-between items-center', className)}>
          <div className={'mr-2'}>
            <Title text={'Вход в аккаунт'} size={'md'} className={'font-bold'} />
            <p className={'text-gray-400'}>Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <img src='/assets/images/phone-icon.png' alt='phone' width={60} height={60} />
        </div>

        <FormInput name={'email'} label={'E-mail'} type={'email'} required />
        <FormInput name={'password'} label={'Пароль'} type={'password'} required />

        <Button loading={form.formState.isSubmitting} className={'h-12 text-base'} type={'submit'}>
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
