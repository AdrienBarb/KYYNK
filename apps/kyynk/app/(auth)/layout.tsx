import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthLayout: FC<Props> = async ({ children }) => {
  return <main>{children}</main>;
};

export default AuthLayout;
