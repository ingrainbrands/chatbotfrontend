const env = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "Iryax AI",

  ENVIRONMENT: import.meta.env.MODE,

  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL ?? "",

  API_VERSION:
    import.meta.env.VITE_API_VERSION || "v1",

  REQUEST_TIMEOUT:
    Number(import.meta.env.VITE_REQUEST_TIMEOUT) || 90000,

  ENABLE_LOGS:
    import.meta.env.DEV,

  ENABLE_STREAMING:
    import.meta.env.VITE_ENABLE_STREAMING === "true",

  DEFAULT_LANGUAGE:
    import.meta.env.VITE_DEFAULT_LANGUAGE || "en",

  MAX_MESSAGE_LENGTH:
    Number(import.meta.env.VITE_MAX_MESSAGE_LENGTH) || 4000,

  MAX_HISTORY:
    Number(import.meta.env.VITE_MAX_HISTORY) || 20,

  RECONNECT_DELAY:
    Number(import.meta.env.VITE_RECONNECT_DELAY) || 3000,
};

export default env;