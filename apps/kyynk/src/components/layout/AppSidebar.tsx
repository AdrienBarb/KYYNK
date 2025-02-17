'use client';

import {
  ChevronRight,
  CirclePlus,
  Home,
  MessageCircle,
  Plus,
  Settings,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/Sidebar';
import { NavUser } from './NavUser';
import Link from 'next/link';
import { appRouter } from '@/constants/appRouter';
import { Button } from '../ui/Button';
import { useUser } from '@/hooks/users/useUser';
import { isCreator } from '@/utils/users/isCreator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

export function AppSidebar() {
  const { user } = useUser();

  const platforms = [
    {
      title: 'Home',
      url: appRouter.home,
      icon: Home,
      isVisible: true,
    },
    {
      title: 'Models',
      url: appRouter.models,
      icon: UsersRound,
      isVisible: true,
    },
    {
      title: 'Conversations',
      url: appRouter.conversations,
      icon: MessageCircle,
      isVisible: !!user,
    },
  ];

  const creators = [
    {
      title: 'Add a nude',
      url: appRouter.addNudes,
      icon: Plus,
    },
  ];

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
              {platforms.map(
                (item) =>
                  item.isVisible && (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
              )}
              <Collapsible defaultOpen={false} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Settings />
                      <span className="text-sm font-rubik">Settings</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {isCreator({ user }) && (
                        <SidebarMenuSubItem>
                          <SidebarMenuButton asChild>
                            <Link href={appRouter.settingsConversations}>
                              <MessageCircle />
                              <span>Conversations</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
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
