'use client';

import {
  ChevronRight,
  Home,
  MessageCircle,
  Settings,
  UsersRound,
  CreditCard,
  Sliders,
  BadgeEuro,
  User,
  Dot,
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
} from '@/components/ui/Sidebar';
import { NavUser } from './NavUser';
import Link from 'next/link';
import { appRouter } from '@/constants/appRouter';
import { useUser } from '@/hooks/users/useUser';
import { isCreator } from '@/utils/users/isCreator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { isUserVerified } from '@/utils/users/isUserVerified';
import useApi from '@/hooks/requests/useApi';
import { ConversationType } from '@/types/conversations';

export function AppSidebar() {
  const { user, isLoggedIn } = useUser();

  const { useGet } = useApi();

  const { data: conversations } = useGet('/api/conversations');

  console.log('🚀 ~ AppSidebar ~ conversations:', conversations);

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
  ];

  const creators = [
    {
      title: 'Revenue',
      url: appRouter.revenue,
      icon: BadgeEuro,
    },
  ];

  const settings = [
    {
      title: 'My Profile',
      url: appRouter.myProfile,
      icon: User,
      isVisible: isLoggedIn(),
    },
    {
      title: 'Conversations',
      url: appRouter.settingsConversations,
      icon: MessageCircle,
      isVisible:
        isLoggedIn() && isCreator({ user }) && isUserVerified({ user }),
    },
    {
      title: 'Payment',
      url: appRouter.settingsPayment,
      icon: CreditCard,
      isVisible:
        isLoggedIn() && isCreator({ user }) && isUserVerified({ user }),
    },
    {
      title: 'Preferences',
      url: appRouter.settingsPreferences,
      icon: Sliders,
      isVisible: isLoggedIn(),
    },
  ];

  const isMobile = useIsMobile();

  return (
    <Sidebar>
      {isMobile && (
        <SidebarHeader>
          <SidebarTrigger />
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
              {isLoggedIn() && (
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
                        {settings.map(
                          (item) =>
                            item.isVisible && (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuButton asChild>
                                  <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ),
                        )}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {isCreator({ user }) && isUserVerified({ user }) && (
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
        {conversations && (
          <SidebarGroup>
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {conversations.map((conversation: ConversationType) => (
                  <SidebarMenuItem key={conversation.id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/account/conversations/${conversation.id}`}>
                        <span>{conversation.participants[0].pseudo}</span>
                      </Link>
                    </SidebarMenuButton>
                    {conversation.hasUnreadMessages && (
                      <SidebarMenuBadge>
                        <Dot />
                      </SidebarMenuBadge>
                    )}
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
