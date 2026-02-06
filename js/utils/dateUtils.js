import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1/+esm';

export function formatShortDate (date) {
  return dayjs(date).format('MMM D');
}

export function formatLongDate (date) {
  return dayjs(date).format('ddd, D MMM');
}


export function getHour ()  {
  const now = new Date();
  const currentHour = now.getHours();

  return currentHour;
}

export function updateTheme(hour) {
    if(hour >= 6 && hour < 18) {
        document.body.classList.add('day');
        document.body.classList.remove('night');
    } else {
        document.body.classList.add('night');
        document.body.classList.remove('day');
    }
}


export function formatTime (date) {
 
  return dayjs(date).format("HH:mm");

}