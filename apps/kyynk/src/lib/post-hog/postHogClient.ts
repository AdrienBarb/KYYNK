import { PostHog } from 'posthog-node';

export const postHogClient = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
  {
    host: '/ingest' as string,
  },
);

await postHogClient.shutdown();
