function openModal(modal, modalTimerId) {
	modal.classList.add('show');
	modal.classList.remove('hide');
	modal.classList.add('fade');
	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function closeModal(modal) {
	modal.classList.remove('show');
	modal.classList.remove('fade');
	modal.classList.add('hide');
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => {
			openModal(modal, modalTimerId);
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
			openModal(modal, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal, openModal };
