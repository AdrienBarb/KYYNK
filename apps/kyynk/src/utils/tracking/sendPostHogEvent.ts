import { postHogClient } from '@/lib/post-hog/postHogClient';

interface SendPostHogEventParams {
  distinctId: string;
  event: string;
  properties?: Record<string, any>;
}

export const sendPostHogEvent = ({
  distinctId,
  event,
  properties,
}: SendPostHogEventParams) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      postHogClient.capture({
        distinctId,
        event,
        properties,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
