import { closeModal, openModal } from './modal';
import { postData } from '../services/services';
function forms(formsSelector, modalDialogSelector, modalSelector, modalTimerId) {
	const forms = document.querySelectorAll(formsSelector);

	const message = {
		loading: 'img/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};
	forms.forEach(item => bindPostData(item));




	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			const json = JSON.stringify(Object.fromEntries(new FormData(form).entries())),
				statusMessage = document.createElement('img');

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
		const prevModalDialog = document.querySelector(modalDialogSelector),
			parent = prevModalDialog.parentElement;
		prevModalDialog.classList.add('hide');
		openModal(parent, modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add(modalDialogSelector.slice(1, modalDialogSelector.lenght));
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector(modalSelector).append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.remove('hide');
			closeModal(parent);
		}, 4000);
	}
}

export default forms;