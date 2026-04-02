export default class ShowBlockByTab {
	constructor(container) {
		// Контейнер, в котором находятся вкладки и блоки
		this.container =
			typeof container === "string"
				? document.querySelector(container)
				: container;
		this.init();
	}

	init() {
		if (!this.container) return;
		// Навешиваем обработчик на контейнер
		this.container.addEventListener("click", this.clickHandler.bind(this));
	}

	clickHandler(e) {
		// Проверяем, был ли клик на элементе с атрибутом data-tab
		const tab = e.target.closest("[data-tab]");
		if (!tab) return; // Если клик был не на вкладке, выходим

		// Убираем класс active у всех вкладок
		this.container
			.querySelectorAll("[data-tab]")
			.forEach((t) => t.classList.remove("active"));
		// Добавляем класс active текущей вкладке
		tab.classList.add("active");

		// Получаем значение data-tab
		const dataTab = tab.dataset.tab;

		// Находим соответствующий блок
		const blocks = this.container.querySelectorAll(`[data-block="${dataTab}"]`);
		if (!blocks) return; // Если блок не найден, выходим

		// Убираем класс active у всех блоков
		this.container
			.querySelectorAll("[data-block]")
			.forEach((b) => b.classList.remove("active"));
		// Добавляем класс active текущему блоку
		blocks.forEach((b) => b.classList.add("active"));
	}
}