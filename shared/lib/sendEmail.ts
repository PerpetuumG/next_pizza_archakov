import { Resend } from 'resend';
import { PayOrderTemplate } from '@/shared/components/email-templates/pay-order-template';

export const sendEmail = async (
  toUserEmail: string,
  subject: string,
  params?: any,
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: toUserEmail,
    subject: subject,
    react: PayOrderTemplate(params),
  });

  if (error) {
    throw error;
  }

  return data;
};
