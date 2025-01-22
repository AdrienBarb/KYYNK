import React, { FC, ReactNode } from 'react';
import { cn } from '@/utils/tailwind/cn';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer: FC<PageContainerProps> = ({ children, className }) => {
  return <div className={cn('w-full min-h-[80vh]', className)}>{children}</div>;
};

export default PageContainer;
