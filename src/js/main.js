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

	modal.addEventListener('click', (e) => {
		if (e.target && e.target === modal || e.target.getAttribute('data-close') === '') {
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
	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	function createCard(data) {
		data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(
				img,
				altimg,
				title,
				descr,
				price,
				'.menu .container'
			).render();
		});
	}
	getResource('http://localhost:3000/menu')
		.then(data => createCard(data));

	//Forms


	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};
	forms.forEach(item => bindPostData(item));

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});
		return await res.json();
	};


	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const json = JSON.stringify(Object.fromEntries(new FormData(form).entries())),
				statusMessage = document.createElement('img');
			// formData.forEach((value, key) => {
			// 	obj[key] = value;
			// });

			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			statusMessage.setAttribute('src', message.loading);
			form.insertAdjacentElement('afterend', statusMessage);

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});

		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog'),
			parent = prevModalDialog.parentElement;
		prevModalDialog.classList.add('hide');
		openModal(parent);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.remove('hide');
			closeModal(parent);
		}, 4000);
	}
	//slider

	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = parseInt(window.getComputedStyle(slidesWrapper).width);



	let offset = 0;

	slidesWrapper.style.overflow = 'hidden';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesField.style.width = 100 * slides.length + '%';
	slides.forEach(slide => {
		slide.style.width = width + 'px';
	});


	const addZero = num => num <= 9 ? `0${num}` : num;
	total.textContent = addZero(slides.length);
	current.textContent = addZero((offset / width) + 1);
	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i);
		dot.classList.add('dot');
		indicators.append(dot);
		dots.push(dot);
	}
	dots[offset / parseInt(width)].style.opacity = 1;

	prev.addEventListener('click', () => {
		if (offset === 0) {
			offset = width * (slides.length - 1);
		} else {
			offset -= width;
		}

		moveSlide(width, offset);

	});

	next.addEventListener('click', () => {
		if (offset === width * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += width;
		}
		moveSlide(width, offset);

	});

	function moveSlide(slideWidth, offset) {
		let slideIndex = offset / slideWidth;
		current.textContent = addZero(slideIndex + 1);
		slidesField.style.transform = `translateX(-${offset}px)`;
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex].style.opacity = 1;
	}

	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			offset = dot.getAttribute('data-slide-to') * width;
			moveSlide(width, offset);
		});
	});


	//Calc

	const result = document.querySelector('.calculating__result span');



	let sex, height, weight, age, ratio;
	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', sex);

	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', ratio);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(el => {
			el.classList.remove(activeClass);
			if (el.getAttribute('id') === localStorage.getItem('sex')) {
				el.classList.add(activeClass);
			}

			if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				el.classList.add(activeClass);
			}
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInformation(parentSelector, activeClass) {
		const elements = document.querySelectorAll(parentSelector);

		elements.forEach(el => {
			el.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', ratio);
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', sex);
				}

				console.log(ratio, sex);
				elements.forEach(el => el.classList.remove(activeClass));
				e.target.classList.add(activeClass);
				calcTotal();
			});
		});
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = '';
			}

			switch (input.getAttribute('id')) {
				case 'weight':
					weight = +input.value;
					break;
				case 'height':
					height = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');

});