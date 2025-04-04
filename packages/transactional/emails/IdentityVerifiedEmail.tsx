import { Tailwind } from '@react-email/components';
import * as React from 'react';
import { tailwindConfig } from '../config';

const VerifiedEmail = ({ link }: { link: string }) => {
  return (
    <Tailwind config={tailwindConfig}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary">Congratulations!</h1>
        <p className="mt-2 text-lg">Hello,</p>
        <p className="mt-1">
          We are thrilled to inform you that your identity has been successfully
          verified. You can now start uploading content and engage in
          discussions with other users.
        </p>
        <div className="mt-4">
          <a
            href={link}
            className="bg-primary text-secondary-dark px-4 py-2 rounded-sm text-center text-lg font-semibold"
          >
            Get Started
          </a>
        </div>
        <p className="mt-4">
          Click the button above to dive into the app and explore all the
          features available to you.
        </p>
        <p className="mt-4">Best regards,</p>
        <p>Your Company Team</p>
      </div>
    </Tailwind>
  );
};

export default VerifiedEmail;
