'use client';

import React, { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import AppMenu from './AppMenu';
import CustomDrawer from './Drawer';

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} data-id="mobile-burger-menu">
        <MenuIcon />
      </div>
      <CustomDrawer openDrawer={open} setOpenDrawer={setOpen}>
        <AppMenu setOpenDrawer={setOpen} />
      </CustomDrawer>
    </>
  );
};

export default Menu;
