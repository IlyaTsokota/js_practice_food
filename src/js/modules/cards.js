import { getResource } from '../services/services';


function cards(parentSelector) {
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


	function createCard(data) {
		data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(
				img,
				altimg,
				title,
				descr,
				price,
				parentSelector

			).render();
		});
	}
	getResource('http://localhost:3000/menu')
		.then(data => createCard(data));

}

export default cards;