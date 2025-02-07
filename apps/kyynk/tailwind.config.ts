import type { Config } from 'tailwindcss';
import sharedConfig from '@kyynk/tailwind-config';

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './app-features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [sharedConfig],
};

export default config;
