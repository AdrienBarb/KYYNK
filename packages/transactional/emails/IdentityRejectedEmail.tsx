import { Tailwind } from '@react-email/components';
import * as React from 'react';
import { tailwindConfig } from '../config';

const RejectedEmail = ({ link }: { link: string }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary">
          Identity Verification Rejected
        </h1>
        <p className="mt-2 text-lg">Hello,</p>
        <p className="mt-1">
          We regret to inform you that your identity verification has been
          rejected. Please upload your identity documents again on the app.
        </p>
        <div className="mt-4">
          <a
            href={link}
            className="bg-primary text-secondary-dark px-4 py-2 rounded-sm text-center text-lg font-semibold"
          >
            Connect to the App
          </a>
        </div>
        <p className="mt-4">
          If you have any questions, please contact our support team.
        </p>
        <p className="mt-4">Best regards,</p>
        <p>Your Company Team</p>
      </div>
    </Tailwind>
  );
};

export default RejectedEmail;
