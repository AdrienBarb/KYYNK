import React, { FC } from 'react';
import Text from '@/components/ui/Text';
import Title from '@/components/ui/Title';
import { cn } from '@/utils/tailwind/cn';

interface Props {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader: FC<Props> = ({ title, description, className }) => {
  return (
    <div className={cn(className)}>
      <Title Tag="h2">{title}</Title>
      {description && <Text>{description}</Text>}
    </div>
  );
};

export default PageHeader;
