/**
 * Выровнять высоту всех `.services-blocks__text` по самому высокому (стек слайдов не дёргается по вертикали).
 * ResizeObserver ловит смену ширины контейнера; rAF схлопывает частые вызовы в один кадр.
 */
export function initEqualizeServicesTextsHeight(container) {
	const selector = ".services-blocks__text";
	let raf = 0;

	const apply = () => {
		const texts = [...container.querySelectorAll(selector)];
		if (texts.length < 2) return;

		for (const el of texts) el.style.minHeight = "";
		void container.offsetHeight;

		let max = 0;
		for (const el of texts) max = Math.max(max, el.getBoundingClientRect().height);
		const h = `${Math.ceil(max)}px`;
		for (const el of texts) el.style.minHeight = h;
	};

	const schedule = () => {
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(() => {
			raf = 0;
			apply();
		});
	};

	new ResizeObserver(schedule).observe(container);
	schedule();
}
