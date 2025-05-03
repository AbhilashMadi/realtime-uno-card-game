const envConfig = {
  BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_URL,
  BACKEND_ROOM_SOCKET_URL: import.meta.env.VITE_ROOM_SOCKET_URL,
};

for (const [key, value] of Object.entries(envConfig)) {
  if (!value) {
    throw new Error(
      `Missing environment variable: ${key} (check your .env file)`,
    );
  }
}

export default envConfig;
