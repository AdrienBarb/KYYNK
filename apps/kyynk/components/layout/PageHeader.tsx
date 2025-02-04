import React, { FC } from 'react';
import Text from '@/components/ui/Text';
import Title from '@/components/ui/Title';

interface Props {
  title: string;
  description?: string;
}

const PageHeader: FC<Props> = ({ title, description }) => {
  return (
    <div>
      <Title Tag="h2">{title}</Title>
      {description && <Text>{description}</Text>}
    </div>
  );
};

export default PageHeader;
