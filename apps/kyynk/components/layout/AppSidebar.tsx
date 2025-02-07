'use client';

import {
  CirclePlus,
  Home,
  MessageCircle,
  Plus,
  UsersRound,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { NavUser } from './NavUser';
import Link from 'next/link';
import { appRouter } from '@/constants/appRouter';
import { Button } from '../ui/Button';
import { useUser } from '@/lib/hooks/useUser';
import { isCreator } from '@/utils/users/isCreator';

const platforms = [
  {
    title: 'Home',
    url: appRouter.home,
    icon: Home,
  },
  {
    title: 'Models',
    url: appRouter.models,
    icon: UsersRound,
  },
  {
    title: 'Conversations',
    url: appRouter.conversations,
    icon: MessageCircle,
  },
];

const creators = [
  {
    title: 'Add a nude',
    url: appRouter.addNudes,
    icon: Plus,
  },
];

export function AppSidebar() {
  const { user } = useUser();

  return (
    <Sidebar>
      {isCreator({ user }) && (
        <SidebarHeader>
          <Button asChild variant="secondary" size="sm">
            <Link href={appRouter.addNudes} className="flex items-center gap-2">
              <CirclePlus size={18} />
              Add nude
            </Link>
          </Button>
        </SidebarHeader>
      )}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platforms.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {isCreator({ user }) && (
          <SidebarGroup>
            <SidebarGroupLabel>Creators</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {creators.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
