export const generateId = () => crypto.randomUUID();

export const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const isEmpty = (value) =>
  value === null ||
  value === undefined ||
  value === "";

export const trimMessage = (message) =>
  message.trim();

export const truncate = (text, length = 120) => {
  if (!text) return "";

  return text.length > length
    ? text.substring(0, length) + "..."
    : text;
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export const openExternal = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const scrollToBottom = (element) => {
  if (!element) return;

  element.scrollTop = element.scrollHeight;
};