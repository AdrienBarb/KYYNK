import { Button, Tailwind } from '@react-email/components';
import * as React from 'react';

const TestEmail = ({ link }) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#007291',
            },
          },
        },
      }}
    >
      <Button
        href={link}
        className="bg-brand px-3 py-2 font-medium leading-4 text-white"
      >
        Click me
      </Button>
    </Tailwind>
  );
};

export default TestEmail;
