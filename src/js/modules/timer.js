function timer(
	deadline,
	timerSelector,
	daysSelector,
	hoursSelector,
	minutesSelector,
	secondsSelector
) {
	function getTimeRemaining(endtime) {
		const time = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(time / (1000 * 60 * 60 * 24)),
			hours = Math.floor((time / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((time / (1000 * 60) % 60)),
			seconds = Math.floor((time / 1000) % 60);

		return {
			'total': time,
			days,
			hours,
			minutes,
			seconds
		};
	}
	const setZero = val => val < 10 ? `0${val}` : val;

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector(daysSelector),
			hours = timer.querySelector(hoursSelector),
			minutes = timer.querySelector(minutesSelector),
			seconds = timer.querySelector(secondsSelector),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();
		function updateClock() {
			const time = getTimeRemaining(endtime);
			if (time.total <= 0) {
				clearInterval(timeInterval);
			}
			days.innerHTML = setZero(time.days);
			hours.innerHTML = setZero(time.hours);
			minutes.innerHTML = setZero(time.minutes);
			seconds.innerHTML = setZero(time.seconds);
		}
	}


	setClock(timerSelector, deadline);
}

export default timer;