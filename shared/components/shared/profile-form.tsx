'use client';

import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  formRegisterSchema,
  TFormRegisterValues,
} from '@/shared/components/shared/modals/auth-modal/forms/schemas';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Button, Container, FormInput, Title } from '@/shared/components';

interface Props {
  className?: string;
  data: User;
}

export const ProfileForm: FC<Props> = ({ className, data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Данные обновлены', {
        icon: '✅',
      });
    } catch (e) {
      return toast.error('Ошибка обновления данных', {
        icon: '❌',
      });
    }
  };

  const onClickSingOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className={'my-10'}>
      <Title text={`Личные данные | #${data.id}`} size={'md'} className={'font-bold'} />
      <FormProvider {...form}>
        <form className={'flex flex-col gap-5 w-96 mt-10'} onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name={'email'} label={'E-mail'} required />
          <FormInput name={'fullName'} label={'Полное имя'} required />

          <FormInput type={'password'} name={'password'} label={'Новый пароль'} required />
          <FormInput
            type={'password'}
            name={'confirmPassword'}
            label={'Повторите пароль'}
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className={'text-base mt-10'}
            type={'submit'}
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSingOut}
            variant={'secondary'}
            disabled={form.formState.isSubmitting}
            className={'text-base'}
            type={'button'}
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
