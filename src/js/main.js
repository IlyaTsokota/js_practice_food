"use strict";

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

hideTabContent();
showTabContent();

tabheaderItemsContainer.addEventListener('click', (e) => {
	const target = e.target;
	if (target && target.classList.contains('tabheader__item')) {
		tabs.forEach((item, i) => {
			if (target === item) {
				hideTabContent();
				showTabContent(i);
			}
		})
	}
});