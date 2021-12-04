const allCurrentHours = document.querySelectorAll('.card__hours--current');
const allPreviousHours = document.querySelectorAll('.card__hours--previous');

async function showCards() {
  try {
    const data = await fetch('./data.json');
    const cardsData = await data.json();

    showDaily();
    showWeekly();
    showMonthly();
  } catch (error) {
    console.error(error);
  }
}

function showDaily() {}
function showWeekly() {}
function showMonthly() {}
