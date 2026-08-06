export const formatTime = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export const formatDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};