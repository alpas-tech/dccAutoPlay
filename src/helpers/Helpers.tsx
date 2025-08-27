import Cookies from 'js-cookie';
import NepaliDate from 'nepali-datetime';

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

export const nepaliWeekdays = ['आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];

export const nepaliMonths = [
  'बैशाख',
  'जेठ',
  'असार',
  'साउन',
  'भदौ',
  'असोज',
  'कार्तिक',
  'मंसिर',
  'पौष',
  'माघ',
  'फाल्गुण',
  'चैत',
];

export function convertToNepaliDigits(number: number | string) {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(number).replace(/\d/g, (d) => nepaliDigits[parseInt(d)]);
}

export const nepaliDateAndTime = () => {
  const currentDate = new Date();

  const formattedTime = currentDate.toLocaleTimeString('ne-NP', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const nepaliDate = new NepaliDate();
  const nepaliYear = nepaliDate.getYear();
  const nepaliMonth = nepaliDate.getMonth();
  const nepaliDay = nepaliDate?.getDate();

  const nepaliFormattedDate = `${convertToNepaliDigits(nepaliDay)} ${nepaliMonths[nepaliMonth]} ${convertToNepaliDigits(
    nepaliYear
  )}`;
  const nepaliFormattedTime = convertToNepaliDigits(formattedTime);
  const nepaliFormattedDay = nepaliWeekdays[currentDate.getDay()];

  return {
    nepaliFormattedDate,
    nepaliFormattedTime,
    nepaliFormattedDay,
  };
};
