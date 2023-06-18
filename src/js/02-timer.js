import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const elements = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

elements.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future!');
    } else {
      elements.startBtn.disabled = false;
    }

    elements.startBtn.addEventListener('click', handlerClickStart);
    function handlerClickStart() {
      let intervalId = setInterval(() => {
        elements.startBtn.disabled = true;
        elements.dateTimePicker.disabled = true;
        const selectedDate = selectedDates[0];
        const currentTime = new Date();
        const diff = selectedDate - currentTime;
        const dateObj = convertMs(diff);

        if (diff <= 0) {
          clearInterval(intervalId);
          intervalId = null;
          return Notiflix.Notify.success('Time is up!');
        }

        elements.days.textContent = dateObj.days.toString().padStart(2, '0');
        elements.hours.textContent = dateObj.hours.toString().padStart(2, '0');
        elements.minutes.textContent = dateObj.minutes
          .toString()
          .padStart(2, '0');
        elements.seconds.textContent = dateObj.seconds
          .toString()
          .padStart(2, '0');
      }, 1000);
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
