import React, { ReactNode } from 'react';
import ScrollableContainer from '@/components/ScrollableContainer';

const ProfileLayout = async ({ children }: { children: ReactNode }) => {
  return <ScrollableContainer>{children}</ScrollableContainer>;
};

export default ProfileLayout;
