import React from 'react';
import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { appRouter } from '@/appRouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/DropDown';
import { User, Wallet, Link, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/Ui/Button';
import { useUser } from '@/lib/hooks/useUser';

export const UserMenu = () => {
  const t = useTranslations();

  const { getUser } = useUser();
  const user = getUser();

  const logout = () => {
    toast.success(t('success.logout'));
    signOut({
      redirect: true,
      callbackUrl: `${process?.env?.NEXT_PUBLIC_BASE_URL}/`,
    });
  };

  const menuItems = [
    {
      path: `/dashboard/community/${user?.id}`,
      icon: <User className="mr-2" />,
      label: 'navigation.profile',
    },
    {
      path: appRouter.becomeCreator,
      icon: <Wallet className="mr-2" />,
      label: 'navigation.becomeCreator',
    },
    {
      path: appRouter.referral,
      icon: <Link className="mr-2" />,
      label: 'navigation.referral',
    },
    {
      path: appRouter.parameters,
      icon: <Settings className="mr-2" />,
      label: 'navigation.parameter',
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2" />
          {user?.pseudo}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.path}
            onClick={() => {
              console.log(item);
            }}
          >
            <Button variant="ghost">
              {item.icon}
              {t(item.label)}
            </Button>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2" />
          {t('navigation.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
