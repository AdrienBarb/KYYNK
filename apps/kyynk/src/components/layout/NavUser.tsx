'use client';

import {
  BadgeCheck,
  ChevronsUpDown,
  Coins,
  HelpCircle,
  LogOut,
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
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/users/useUser';
import { appRouter } from '@/constants/appRouter';
import { usePaymentModalStore } from '@/stores/PaymentModalStore';
import { formatCredits } from '@/utils/prices/formatCredits';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useUser();
  const { openModal } = usePaymentModalStore();

  const logout = () => {
    toast.success('You are logged out');
    signOut({ redirectTo: '/' });
  };

  const UserDetails = () => {
    return (
      <>
        <Avatar
          size={32}
          imageId={user?.profileImageId}
          pseudo={user?.pseudo}
        />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user?.pseudo}</span>
          <span className="truncate text-xs">
            {formatCredits(user?.creditsAmount || 0)} credits
          </span>
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
                <Link href={`/${user?.slug}`}>
                  <User />
                  My Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={openModal}>
                <Coins />
                Buy credits
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={appRouter.becomeCreator} className="font-karla">
                  <BadgeCheck />
                  Become a creator
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={
                    process.env.NEXT_PUBLIC_CREATOR_TOOLKIT_NOTION_URL || ''
                  }
                  target="_blank"
                  className="font-karla"
                >
                  <HelpCircle />
                  Need help?
                </Link>
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
