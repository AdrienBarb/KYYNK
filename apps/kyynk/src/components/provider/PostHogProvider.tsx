'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import PostHogPageView from '@/components/tracking/PostHogPageView';
import { isProduction } from '@/utils/environments';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('🚀 ~ isProduction:', isProduction);

    if (isProduction) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: true,
        capture_pageleave: true,
      });

      console.log('🚀 ~ posthog initialized');
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
