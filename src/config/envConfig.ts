const envConfig = {
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
export default envConfig;
