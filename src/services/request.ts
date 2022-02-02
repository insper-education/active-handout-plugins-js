export function redirectTo(url: string) {
  window.location.href = url;
}

export function getQueryParam(name: string) {
  return new URLSearchParams(window.location.search).get(name);
}

export function getFullUrlWithoutQuery() {
  const { protocol, host, pathname } = window.location;
  return `${protocol}//${host}${pathname}`;
}
