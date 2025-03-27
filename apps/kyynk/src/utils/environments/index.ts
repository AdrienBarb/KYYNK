export const isProduction = process.env.APP_ENV === 'production';
export const isStaging = process.env.APP_ENV === 'staging';
export const isDevelopment = process.env.APP_ENV === 'development';

console.log(`Running in ${process.env.APP_ENV} mode.`);
