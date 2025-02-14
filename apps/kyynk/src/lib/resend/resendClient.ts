import { Resend } from 'resend';

console.log(
  '🚀 ~ process.env.RESEND_API_KEY:',
  process.env.NEXT_PUBLIC_RESEND_API_KEY,
);
export const resendClient = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
