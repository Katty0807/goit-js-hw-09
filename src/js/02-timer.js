import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
onClose(selectedDates) {
console.log(selectedDates[0]);
onDateSelected(selectedDates[0]);
},
};
flatpickr(document.getElementById('datetime-picker'), options);
const input = document.getElementById('datetime-picker');
const buttonStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
flatpickr(input, options);
buttonStartEl.addEventListener('click', () => {
buttonStartEl.disabled = true;
input.disabled = true;
});
buttonStartEl.disabled = true;
let intervalId = null;
let selectedDate = null;
const onDateSelected = date => {
selectedDate = date;
const now = new Date();
if (date.getTime() <= now.getTime()) {
buttonStartEl.disabled = true;
Notiflix.Notify.failure('Please choose a date in the future');
return;
}
buttonStartEl.disabled = false;
intervalId = setInterval(intervalCallback, 1000);
};
const intervalCallback = () => {
const now = new Date();
if (now.getTime() <= selectedDate.getTime) {
clearInterval(intervalId);
}
const diffMs = selectedDate.getTime() - now.getTime();
const { days, hours, minutes, seconds } = convertMs(diffMs);
formatValueAndApply(days, daysEl);
formatValueAndApply(hours, hoursEl);
formatValueAndApply(minutes, minutesEl);
formatValueAndApply(seconds, secondsEl);
};
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
function formatValueAndApply(value, element) {
element.textContent = String(value).padStart(2, '0');
}