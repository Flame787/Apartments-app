export function formatTime(isoString: string): string {
  const date = new Date(isoString);

  // local EU time:
  const local = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const time = new Date(local);

  const isToday =
    time.getFullYear() === today.getFullYear() &&
    time.getMonth() === today.getMonth() &&
    time.getDate() === today.getDate();

  const isYesterday =
    time.getFullYear() === yesterday.getFullYear() &&
    time.getMonth() === yesterday.getMonth() &&
    time.getDate() === yesterday.getDate();

  const DD = String(time.getDate()).padStart(2, "0");
  const MM = String(time.getMonth() + 1).padStart(2, "0");
  const YYYY = time.getFullYear();
  const HH = String(time.getHours()).padStart(2, "0");
  const MIN = String(time.getMinutes()).padStart(2, "0");

  if (isToday) {
    return `${HH}:${MIN}`;
  }

  // if news are not from today, but still from this year:
  if (isYesterday || time.getFullYear() === now.getFullYear()) {
    return ` ${DD}.${MM}. ${HH}:${MIN}`;
  }

  return ` ${DD}.${MM}.${YYYY}. ${HH}:${MIN}`;
}
