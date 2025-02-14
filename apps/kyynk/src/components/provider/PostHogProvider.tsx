'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import PostHogPageView from '@/components/tracking/PostHogPageView';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log(
      "🚀 ~ useEffect ~ process.env.NODE_ENV === 'production':",
      process.env.NODE_ENV === 'production',
    );
    if (process.env.NODE_ENV === 'production') {
      console.log('🚀 ~ Posthog is enabled');
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'always',
        capture_pageview: true,
      });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
