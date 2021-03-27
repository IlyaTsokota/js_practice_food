function slider(
	{ slidesSelector,
		sliderSelector,
		prevSelector,
		nextSelector,
		totalSelector,
		currentSelector,
		slidesWrapperSelector,
		slidesFieldSelector,
		classDots }
) {
	const slides = document.querySelectorAll(slidesSelector),
		slider = document.querySelector(sliderSelector),
		prev = document.querySelector(prevSelector),
		next = document.querySelector(nextSelector),
		total = document.querySelector(totalSelector),
		current = document.querySelector(currentSelector),
		slidesWrapper = document.querySelector(slidesWrapperSelector),
		slidesField = document.querySelector(slidesFieldSelector),
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
	indicators.classList.add(classDots);
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

}


export default slider;