export default function parseTimestamp(timestamp: string) {
  const matchResult = timestamp.match(
    /(\d{4}).(\d{2}).(\d{2})-(\d{2}).(\d{2}).(\d{2}):(\d{3})/,
  );

  if (!matchResult) return NaN;

  const [, year, month, date, hours, minutes, seconds, ms] = matchResult;

  const timestampDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(date),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds),
    parseInt(ms),
  );

  return timestampDate.getTime();
}
