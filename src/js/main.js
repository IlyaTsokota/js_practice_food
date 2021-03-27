"use strict";
import tabs from './modules/tabs';
import calc from './modules/calc';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import modal from './modules/modal';
import { openModal } from './modules/modal';


document.addEventListener("DOMContentLoaded", () => {


	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	calc('.calculating__result span');
	const deadline = '2021-05-11';
	timer(deadline, '.timer', "#days", "#hours", "#minutes", "#seconds");
	cards('.menu .container');
	slider(
		{
			slidesSelector: '.offer__slide',
			sliderSelector: '.offer__slider',
			prevSelector: '.offer__slider-prev',
			nextSelector: '.offer__slider-next',
			totalSelector: '#total',
			currentSelector: '#current',
			slidesWrapperSelector: '.offer__slider-wrapper',
			slidesFieldSelector: '.offer__slider-inner',
			classDots: 'carousel-indicators'
		}
	);
	const modalEl = document.querySelector('.modal'),
		modalTimerId = setTimeout(() => openModal(modalEl, modalTimerId), 30000, modal);

	modal('[data-modal]', '.modal', modalTimerId);
	forms('form', '.modal__dialog', '.modal', modalTimerId);

});