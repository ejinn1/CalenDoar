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
