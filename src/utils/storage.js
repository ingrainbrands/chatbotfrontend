export const storage = {
  get(key, fallback = null) {
    try {
      const value = localStorage.getItem(key);

      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch {}
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};