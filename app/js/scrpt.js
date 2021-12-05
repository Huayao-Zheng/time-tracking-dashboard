const allCurrentHours = document.querySelectorAll('.card__display__hours__current');
const allPreviousHours = document.querySelectorAll('.card__display__hours__previous');
const dailyBtn = document.querySelector('#daily');
const weeklyBtn = document.querySelector('#weekly');
const monthlyBtn = document.querySelector('#monthly');

dailyBtn.addEventListener('click', () => getHourRecords('daily'));
weeklyBtn.addEventListener('click', () => getHourRecords('weekly'));
monthlyBtn.addEventListener('click', () => getHourRecords('monthly'));

async function getHourRecords(date) {
  try {
    const data = await fetch('./data.json');
    const records = await data.json();

    records.forEach(({ timeframes }, idx) => {
      const { current, previous } = timeframes[date];

      allCurrentHours[idx].innerHTML = `${current}hr${sOrNoS(current)}`;

      if (date === 'daily') {
        allPreviousHours[idx].innerHTML = `Yesterday - ${previous}hr${sOrNoS(previous)}`;
      }
      if (date === 'weekly') {
        allPreviousHours[idx].innerHTML = `Last Week - ${previous}hr${sOrNoS(previous)}`;
      }
      if (date === 'monthly') {
        allPreviousHours[idx].innerHTML = `Last Month - ${previous}hr${sOrNoS(previous)}`;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function sOrNoS(number) {
  if (number > 1) return 's';
  return '';
}
