export default function corsConfig() {
  const whitelist = [process.env.APP_URL_CLIENT];

  const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
      const isAllowed = !origin || whitelist.includes(origin);

      if (!isAllowed) callback(new Error("Not allowed by CORS"));

      callback(null, true);
    },
    credentials: true,
  };

  return corsOptions;
}