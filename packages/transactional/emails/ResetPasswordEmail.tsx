import { Tailwind } from '@react-email/components';
import * as React from 'react';
import { tailwindConfig } from '../config';

const ResetPasswordEmail = ({ link }: { link: string }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary">Reset Your Password</h1>
        <p className="mt-2 text-lg">Hello,</p>
        <p className="mt-1">
          We received a request to reset your password. Click the button below
          to reset it:
        </p>
        <div className="mt-4">
          <a
            href={link}
            className="bg-primary text-secondary-dark px-4 py-2 rounded-sm text-center text-lg font-semibold"
          >
            Reset Password
          </a>
        </div>
        <p className="mt-4">
          If you did not request a password reset, please ignore this email.
        </p>
        <p className="mt-4">Best regards,</p>
        <p>Your Company Team</p>
      </div>
    </Tailwind>
  );
};

export default ResetPasswordEmail;
