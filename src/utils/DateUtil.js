export function dateToStr(date, format = '') {
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const year = date.getFullYear();
  if(format === 'yyyy-mm-dd') { return `${year}-${month}-${day}` }
  return `${month}-${day}-${year}`;
}

export function unixToDate(dateUnix) {
  return new Date(dateUnix * 1000);
}

export function dateToUnix(date) {
  return Math.floor(date.getTime() / 1000);
}