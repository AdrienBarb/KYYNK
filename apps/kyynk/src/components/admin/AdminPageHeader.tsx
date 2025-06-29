import { FC } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default PageHeader;
