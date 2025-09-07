export const getCookie = (): string | null => {
  const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
  return match ? match[2] : null;
};

export const addCookie = (newToken: string) => {
  document.cookie = `token=${newToken}; path=/; max-age=3600`;
};

export const deleteCookie = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
