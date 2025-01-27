'use client';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Coins,
  CreditCard,
  LogOut,
  Sparkles,
  User,
} from 'lucide-react';

import Avatar from '@/components/ui/Avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/Sidebar';
import { User as UserType } from '@prisma/client';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

export function NavUser({ user }: { user: UserType }) {
  const { isMobile } = useSidebar();

  const logout = () => {
    toast.success('You are logged out');
    signOut();
  };

  const UserDetails = () => {
    return (
      <>
        <Avatar size="s" imageId={user?.profileImageId} pseudo={user?.pseudo} />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user.pseudo}</span>
          <span className="truncate text-xs">{user.creditsAmount} credits</span>
        </div>
      </>
    );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <UserDetails />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserDetails />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={`/${user.slug}`}>
                  <User />
                  My Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Coins />
                Buy credits
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BadgeCheck />
                Become a creator
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
