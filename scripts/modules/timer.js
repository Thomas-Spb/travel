export const timer = () => {
  const timerDays = document.querySelector('.timer__count_days');
  const timerHours = document.querySelector('.timer__count_hours');
  const timerMinutes = document.querySelector('.timer__count_minutes');
  const timerDaysUnits = document.querySelector('.timer__units_days');
  const timerHoursUnits = document.querySelector('.timer__units_hours');
  const timerMinutesUnits = document.querySelector('.timer__units_minutes');
  const heroText = document.querySelector('.hero__text ');
  const heroTimer = document.querySelector('.hero__timer');
  const timerBlock = document.querySelector('.timer');
  timerBlock.dataset.timerDeadline = '2024/04/19 09:19';

  const getTimeRemaining = () => {
    const currentTime = Date.now();
    const deadline = new Date(timerBlock.dataset.timerDeadline).getTime() + 180 * 60 * 1000;
    const timeRemaining = deadline - currentTime;
    // console.log('timeRemaining: ', timeRemaining);

    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    // console.log(seconds, minutes, hours, days, timeRemaining);

    return {
      seconds,
      minutes,
      hours,
      days,
      timeRemaining,
    };
  };

  const getUnits = () => {
    const days = ['день', 'дня', 'дней'];
    const hours = ['час', 'часа', 'часов'];
    const minutes = ['минута', 'минуты', 'минут'];
    const seconds = ['секунда', 'секунды', 'секунд'];
    const timer = getTimeRemaining();

    let day;
    let hour;
    let minute;
    let second;

    if (timer.days % 10 === 0 || (timer.days > 4 && timer.days < 20) || timer.days % 10 > 4) {
      day = days[2];
    } else if (timer.days % 10 > 1 && timer.days % 10 < 5) {
      day = days[1];
    } else if (timer.days % 10 === 1) day = days[0];

    if (timer.hours % 10 === 0 || (timer.hours > 4 && timer.hours < 20) || timer.hours % 10 > 4) {
      hour = hours[2];
    } else if (timer.hours % 10 > 1 && timer.hours % 10 < 5) {
      hour = hours[1];
    } else if (timer.hours % 10 === 1) hour = hours[0];

    if (timer.minutes % 10 === 0 || (timer.minutes > 4 && timer.minutes < 20) || timer.minutes % 10 > 4) {
      minute = minutes[2];
    } else if (timer.minutes % 10 > 1 && timer.minutes % 10 < 5) {
      minute = minutes[1];
    } else if (timer.minutes % 10 === 1) minute = minutes[0];

    if (timer.seconds % 10 === 0 || (timer.seconds > 4 && timer.seconds < 20) || timer.seconds % 10 > 4) {
      second = seconds[2];
    } else if (timer.seconds % 10 > 1 && timer.seconds % 10 < 5) {
      second = seconds[1];
    } else if (timer.seconds % 10 === 1) second = seconds[0];

    return { day, hour, minute, second };
  };

  const start = () => {
    const timer = getTimeRemaining();
    const units = getUnits();

    if (!timer.days) {
      timer.hours >= 10 ? (timerDays.textContent = timer.hours) : (timerDays.textContent = `0${timer.hours}`);
      timer.minutes >= 10 ? (timerHours.textContent = timer.minutes) : (timerHours.textContent = `0${timer.minutes}`);
      timer.seconds >= 10
        ? (timerMinutes.textContent = timer.seconds)
        : (timerMinutes.textContent = `0${timer.seconds}`);
      timerDaysUnits.textContent = units.hour;
      timerHoursUnits.textContent = units.minute;
      timerMinutesUnits.textContent = units.second;
    } else {
      timerDays.textContent = timer.days;
      timer.hours >= 10 ? (timerHours.textContent = timer.hours) : (timerHours.textContent = `0${timer.hours}`);
      timer.minutes >= 10
        ? (timerMinutes.textContent = timer.minutes)
        : (timerMinutes.textContent = `0${timer.minutes}`);
      timerDaysUnits.textContent = units.day;
      timerHoursUnits.textContent = units.hour;
      timerMinutesUnits.textContent = units.minute;
    }

    const intervalId = setTimeout(start, 1000);

    //Убираем таймер

    if (timer.timeRemaining < 0) {
      heroText.remove();
      heroTimer.remove();
      clearTimeout(intervalId);
    }
  };

  start();
};
