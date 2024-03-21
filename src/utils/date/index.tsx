// 주어진 년도와 월에 해당하는 날짜 배열 반환
export function getDaysInMonth(year: number, month: number) {
  let date = new Date(year, month, 1);
  let days = [];

  for (let i = 0; i < date.getDay(); i++) {
    days.push(null);
  }

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isBefore(date1: Date, date2: Date) {
  return date1.getTime() < date2.getTime();
}

export function isSameOrBefore(date1: Date, date2: Date) {
  return date1.getTime() <= date2.getTime();
}

export function isAfter(date1: Date, date2: Date) {
  return date1.getTime() > date2.getTime();
}

export function compareDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() <= date2.getFullYear() &&
    date1.getMonth() <= date2.getMonth() &&
    date1.getDate() <= date2.getDate()
  );
}
