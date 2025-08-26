import Cookies from 'js-cookie';

export function getCookie(name: string) {
  const cookie = Cookies.get(name);
  if (cookie) {
    const parsedCookie = JSON.parse(Cookies.get(name) || '');
    return parsedCookie;
  }
}

export function setCookie(name: string, value: string | Record<string, any> | Array<Record<string, any>>, args?: any) {
  return Cookies.set(name, JSON.stringify(value), args);
}

export function getAllCookies() {
  return Cookies.get();
}

export function deleteCookie(name: string, args: any = {}) {
  return Cookies.remove(name, args);
}
