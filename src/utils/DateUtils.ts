export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month<10?`0${month}`:`${month}`}-${day<10?`0${day}`:`${day}`}`
}

export function substractDays(date: Date, days: number): Date {
  const msDate = date.getTime() - (days * 24 * 60 * 60 * 1000);
  return new Date(msDate);
}