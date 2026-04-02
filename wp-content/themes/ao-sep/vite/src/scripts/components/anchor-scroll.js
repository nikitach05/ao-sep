export default class AnchorScroll {
	constructor(topOffset = 0) {
		this.topOffset = topOffset;
		this.init();
	}

	init() {
		document.querySelectorAll('a[href^="#"]').forEach((link) => {
			link.addEventListener("click", (e) => this.handleClick(e));
		});
	}

	handleClick(e) {
		e.preventDefault();
		const href = e.currentTarget.getAttribute("href").substring(1);
		const scrollTarget = document.getElementById(href);

		if (scrollTarget) {
			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition =
				elementPosition + window.pageYOffset - this.topOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	}
}
