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

	//Modal
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('[data-close]'),
		modalTimerId = setTimeout(openModal, 30000, modal);

	function openModal(modal) {
		modal.classList.add('show');
		modal.classList.remove('hide');
		modal.classList.add('fade');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	function closeModal(modal) {
		modal.classList.remove('show');
		modal.classList.remove('fade');
		modal.classList.add('hide');
		document.body.style.overflow = '';
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => {
			openModal(modal);
		});
	});

	modalCloseBtn.addEventListener('click', () => closeModal(modal));

	modal.addEventListener('click', (e) => {
		if (e.target && e.target === modal) {
			closeModal(modal);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (modal.classList.contains('show') && e.code === "Escape") {
			closeModal(modal);
		}
	});

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modal);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	//Cards

	class MenuCard {
		constructor(src, alt, title, desc, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.desc = desc;
			this.price = price;
			this.classes = classes;
			this.transfer = 27;
			this.parent = document.querySelector(parentSelector);
			this.changeToUAH();
		}

		changeToUAH() {
			this.price *= this.transfer;
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.classes = 'menu__item';
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			element.innerHTML = `
					<img src="${this.src}" alt="${this.alt}">
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.desc}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
			`;
			this.parent.append(element);
		}
	}

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		229,
		'.menu .container',
		'menu__item',
		'big'
	).render();
	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		229,
		'.menu .container',
		'menu__item'

	).render();
	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		229,
		'.menu .container'
	).render();

	//Forms

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'Загрузка',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};
	forms.forEach(item => postData(item));

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = new FormData(form),
				statusMessage = document.createElement('div'),
				request = new XMLHttpRequest(),
				obj = {};

			formData.forEach((value, key) => {
				obj[key] = value;
			});

			const json = JSON.stringify(obj);
			statusMessage.classList.add('status');
			statusMessage.textContent = message.loading;
			form.append(statusMessage);

			request.open('POST', 'server.php');
			request.setRequestHeader('Content-type', 'application/json');

			request.send(json);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					statusMessage.textContent = message.success;
					form.reset();
					setTimeout(() => {
						statusMessage.remove();
					}, 2000);
				} else {
					statusMessage.textContent = message.failure;
				}
			});
		});
	}

});