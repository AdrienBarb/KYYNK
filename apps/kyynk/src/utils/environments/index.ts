const isProduction = process.env.APP_ENV === 'production';
const isStaging = process.env.APP_ENV === 'staging';
const isDevelopment = process.env.APP_ENV === 'development';

console.log(`Running in ${process.env.APP_ENV} mode.`);
