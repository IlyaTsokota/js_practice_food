function tabs(tabsSelector, tabsContentSelector, tabheaderItemsContainerSelector, classActive) {
	const tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabheaderItemsContainer = document.querySelector(tabheaderItemsContainerSelector);

	function hideTabContent() {
		tabsContent.forEach(content => {
			content.classList.add('hide');
			content.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => tab.classList.remove(classActive));
	}

	function showTabContent(index = 0) {
		tabsContent[index].classList.add('show', 'fade');
		tabsContent[index].classList.remove('hide');
		tabs[index].classList.add(classActive);
	}

	tabheaderItemsContainer.addEventListener('click', (e) => {
		const target = e.target;
		if (target && target.classList.contains(tabsSelector.slice(1, tabsSelector.lenght))) {
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
}

export default tabs;