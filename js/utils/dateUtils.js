import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1/+esm';

export function formatShortDate (date) {
  return dayjs(date).format('MMM D');
}

export function formatLongDate (date) {
  return dayjs(date).format('ddd, D MMM');
}