import axios from 'axios';
import { PaymentData } from '@/@types/yookassa';

export async function createPayment(details: any) {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount,
        currency: 'USD',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.order_id,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_API_KEY as string,
        password: '',
      },
      headers: {
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}
