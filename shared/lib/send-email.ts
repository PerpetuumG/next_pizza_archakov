import { Resend } from 'resend';
import React from 'react';

export const sendEmail = async (
  toUserEmail: string,
  subject: string,
  template: React.ReactNode,
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: toUserEmail,
    subject: subject,
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
};
