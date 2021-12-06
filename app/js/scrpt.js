const allCurrentHours = document.querySelectorAll('.card__display__hours__current');
const allPreviousHours = document.querySelectorAll('.card__display__hours__previous');
const dailyBtn = document.querySelector('#daily');
const weeklyBtn = document.querySelector('#weekly');
const monthlyBtn = document.querySelector('#monthly');

dailyBtn.addEventListener('click', () => updateDashboard('daily'));
weeklyBtn.addEventListener('click', () => updateDashboard('weekly'));
monthlyBtn.addEventListener('click', () => updateDashboard('monthly'));

async function updateDashboard(date) {
  try {
    const data = await fetch('./data.json');
    const records = await data.json();

    toggleActive(date);
    updateStats(records, date);
  } catch (error) {
    console.error(error);
  }
}

function toggleActive(date) {
  if (date === 'daily') {
    dailyBtn.classList.add('active');
    weeklyBtn.classList.remove('active');
    monthlyBtn.classList.remove('active');
  } else if (date === 'weekly') {
    dailyBtn.classList.remove('active');
    weeklyBtn.classList.add('active');
    monthlyBtn.classList.remove('active');
  } else {
    dailyBtn.classList.remove('active');
    weeklyBtn.classList.remove('active');
    monthlyBtn.classList.add('active');
  }
}

function updateStats(records, date) {
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
}

function sOrNoS(number) {
  if (number > 1) return 's';
  return '';
}
