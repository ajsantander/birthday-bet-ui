export function dateToStr(date, format = '') {
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const year = date.getFullYear();
  if(format === 'yyyy-mm-dd') { return `${year}-${month}-${day}` }
  return `${month}-${day}-${year}`;
}

export function deltaDays(date1, date2) {
  let d1 = dateToUnix(date1);
  let d2 = dateToUnix(date2);
  return Math.floor((d2 - d1) / 86400); // 86400 seconds in a day
}

export function unixToDate(dateUnix) {
  return new Date(dateUnix * 1000);
}

export function dateToUnix(date) {
  return Math.floor(date.getTime() / 1000);
}