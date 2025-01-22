import ApiVideoClient from '@api.video/nodejs-client';

if (!process.env.API_VIDEO_KEY) {
  throw new Error('Missing API_VIDEO_KEY in environment variables');
}

const apiVideoClient = new ApiVideoClient({
  apiKey: process.env.API_VIDEO_KEY,
});

export default apiVideoClient;
