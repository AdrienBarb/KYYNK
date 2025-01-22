'use client';

import React, { FC, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useMediaQuery } from '@mui/material';
import { screenSizes } from '@/constants/screenSizes';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
//@ts-ignore
import { UilUserCircle } from '@iconscout/react-unicons';
//@ts-ignore
import { UilChat } from '@iconscout/react-unicons';
//@ts-ignore
import { UilMoneybag } from '@iconscout/react-unicons';
//@ts-ignore
import { UilSignOutAlt } from '@iconscout/react-unicons';
//@ts-ignore
import { UilSetting } from '@iconscout/react-unicons';
//@ts-ignore
import { UilMoneyWithdrawal } from '@iconscout/react-unicons';
//@ts-ignore
import { UilCompass } from '@iconscout/react-unicons';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/tailwind/cn';
import { appRouter } from '@/constants/appRouter';

interface Props {
  setOpenDrawer?: (e: boolean) => void;
}

const AppMenu: FC<Props> = ({ setOpenDrawer }) => {
  const t = useTranslations();
  const router = useRouter();

  const { getUser } = useUser();
  const user = getUser();

  const [open, setOpen] = useState<boolean>(false);

  const matches = useMediaQuery(`(max-width:${screenSizes.md}px)`);

  const anchorRef = useRef<HTMLButtonElement>(null);

  const logout = () => {
    toast.success(t('success.logout'));
    signOut({
      redirect: true,
      callbackUrl: `${process?.env?.NEXT_PUBLIC_BASE_URL}/`,
    });
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const buttonClasses = cn('w-full font-medium justify-start gap-2 text-lg');

  return (
    <div className="h-full flex flex-col justify-between mt-16 px-4 mb-4">
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          className={buttonClasses}
          onClick={() => {
            handleNavigation(appRouter.explore);
            if (setOpenDrawer) {
              setOpenDrawer(false);
            }
          }}
        >
          <UilCompass />
          {t('navigation.explore')}
        </Button>
        <Button
          variant="ghost"
          className={buttonClasses}
          onClick={() => {
            handleNavigation(appRouter.messages);
            if (setOpenDrawer) {
              setOpenDrawer(false);
            }
          }}
        >
          <UilChat />
          {t('navigation.message')}
        </Button>

        {user?.userType === 'creator' && (
          <Button
            variant="ghost"
            className={buttonClasses}
            onClick={() => {
              handleNavigation(appRouter.incomes);
              if (setOpenDrawer) {
                setOpenDrawer(false);
              }
            }}
          >
            <UilMoneyWithdrawal />
            {t('navigation.incomes')}
          </Button>
        )}
      </div>

      <div>
        <Button
          ref={anchorRef}
          variant="ghost"
          className={buttonClasses}
          onClick={() => setOpen(true)}
        >
          <UilUserCircle />
          {user?.pseudo}
        </Button>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement={matches ? 'auto-start' : 'right-start'}
          transition
          disablePortal
          sx={{
            zIndex: '100',
            width: '220px',
            margin: matches
              ? '0 0 0.4rem 0 !important'
              : '0 0 0 0.4rem !important',
            padding: '0.6rem',
            backgroundColor: '#fff0eb',
            borderRadius: '6px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps}>
              <Paper
                sx={{
                  boxShadow: 'none',
                  minWidth: 'inherit !important',
                  width: 'auto !important',
                }}
              >
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    sx={{
                      padding: '0',
                      backgroundColor: '#fff0eb',
                      border: 'none',
                      boxShadow: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                    }}
                  >
                    <Button
                      variant="ghost"
                      className={buttonClasses}
                      onClick={() => {
                        handleNavigation(`/${user?.slug}`);
                        setOpen(false);
                        if (setOpenDrawer) {
                          setOpenDrawer(false);
                        }
                      }}
                    >
                      <UilUserCircle />
                      {t('navigation.profile')}
                    </Button>
                    <Button
                      variant="ghost"
                      className={buttonClasses}
                      onClick={() => {
                        handleNavigation(appRouter.becomeCreator);
                        setOpen(false);
                        if (setOpenDrawer) {
                          setOpenDrawer(false);
                        }
                      }}
                    >
                      <UilMoneybag />
                      {t('navigation.becomeCreator')}
                    </Button>
                    <Button
                      variant="ghost"
                      className={buttonClasses}
                      onClick={() => {
                        handleNavigation(appRouter.parameters);
                        setOpen(false);
                        if (setOpenDrawer) {
                          setOpenDrawer(false);
                        }
                      }}
                    >
                      <UilSetting />
                      {t('navigation.parameter')}
                    </Button>

                    <Button
                      variant="ghost"
                      className={buttonClasses}
                      onClick={() => {
                        logout();
                        setOpen(false);
                        if (setOpenDrawer) {
                          setOpenDrawer(false);
                        }
                      }}
                    >
                      <UilSignOutAlt />
                      {t('navigation.logout')}
                    </Button>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default AppMenu;
