'use client';

import React from 'react';
import Button from '@mui/material/Button';
import styles from '@/styles/LanguageSwitcher.module.scss';
import { Popover } from '@mui/material';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { serialize } from 'cookie';

const languages: { label: 'FR' | 'EN'; value: 'fr' | 'en' }[] = [
  { label: 'EN', value: 'en' },
  { label: 'FR', value: 'fr' },
];

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();
  const locale = useLocale();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (value: 'fr' | 'en') => {
    document.cookie = serialize('NEXT_LOCALE', value, { path: '/' });
    router.refresh();
  };

  if (!locale) {
    return null;
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          padding: '0',
          color: 'black',
          fontWeight: '200',
          minWidth: 'inherit',
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        }}
      >
        <div>{locale.toUpperCase()}</div>
      </Button>
      <Popover
        id="simple-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            marginTop: '0.4rem',
          },
        }}
      >
        {languages.map((currentLanguage, index) => (
          <div
            key={index}
            className={clsx(
              styles.menuItems,
              locale === currentLanguage.value && styles.selected,
            )}
            onClick={() => handleChange(currentLanguage.value)}
          >
            {currentLanguage.label}
          </div>
        ))}
      </Popover>
    </div>
  );
};

export default LanguageSwitcher;
