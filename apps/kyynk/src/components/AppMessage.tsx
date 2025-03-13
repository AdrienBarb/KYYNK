import React, { FC, ReactNode } from 'react';
import Text from '@/components/ui/Text';
import Image from 'next/image';
import Title from '@/components/ui/Title';

interface AppMessageProps {
  title: string;
  text: string;
  children?: ReactNode;
}

const AppMessage: FC<AppMessageProps> = ({ title, text, children }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-primary rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-4">
          <Image
            src={'/images/svg/pink.svg'}
            alt="logo"
            fill={true}
            objectFit="contain"
          />
        </div>
        <Title Tag="h3" className="text-secondary text-center">
          {title}
        </Title>
        <Text className="text-secondary text-center">{text}</Text>
        {children && (
          <div className="mt-4 w-full flex flex-col gap-2">{children}</div>
        )}
      </div>
    </div>
  );
};

export default AppMessage;
