"use strict";

//tabs
document.addEventListener("DOMContentLoaded", () => {
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabheaderItemsContainer = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(content => {
			content.classList.add('hide');
			content.classList.remove('show', 'fade');
		});
		console.log(tabsContent);

		tabs.forEach(tab => tab.classList.remove('tabheader__item_active'));
	}

	function showTabContent(index = 0) {
		tabsContent[index].classList.add('show', 'fade');
		tabsContent[index].classList.remove('hide');
		tabs[index].classList.add('tabheader__item_active');
	}

	tabheaderItemsContainer.addEventListener('click', (e) => {
		const target = e.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target === item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	hideTabContent();
	showTabContent();

	//Timer

	const deadline = '2021-05-11';


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
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
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


	setClock('.timer', deadline);
});