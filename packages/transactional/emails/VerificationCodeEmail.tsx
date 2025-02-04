import { Tailwind } from '@react-email/components';
import * as React from 'react';
import { tailwindConfig } from '../config';

const VerificationCodeEmail = ({ code }: { code: number }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary">Verification Code</h1>
        <p className="mt-2 text-lg">Hello,</p>
        <p className="mt-1">
          Thank you for signing up. Please use the following code to verify your
          email address:
        </p>
        <div className="mt-4 p-2 bg-primary text-secondary rounded-sm text-center text-xl font-semibold">
          {code}
        </div>
        <p className="mt-4">
          If you did not request this code, please ignore this email.
        </p>
        <p className="mt-4">Best regards,</p>
        <p>Your Company Team</p>
      </div>
    </Tailwind>
  );
};

export default VerificationCodeEmail;
