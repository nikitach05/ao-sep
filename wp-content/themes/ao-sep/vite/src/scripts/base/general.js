// Modules
// import { OverlayScrollbars } from 'overlayscrollbars';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Compoments
import '../components/sliders';
import '../components/checkbox';
import modalToggle from "../components/modal-toggle";
import { MaskPhone } from '../components/input-masks';
// import ScrollTop from "../components/scroll-top";

document.addEventListener('DOMContentLoaded', () => {

	new MaskPhone('input[type="tel"]');
	new modalToggle();

	// new ScrollTop(".to-top", 1000);

	Fancybox.bind("[data-fancybox]", {
		Thumbs: {
			type: "classic",
		},
		hideScrollbar: false,
	});

	// Fancybox order-modal
	const orderModalButtons = document.querySelectorAll("[data-modal]");
	orderModalButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			const modalID = button.dataset.modal;
			const modal = document.querySelector(`#${modalID}`);

			// Открываем модальное окно через Fancybox
			Fancybox.show(
				[
					{
						src: modal,
						type: "inline",
					},
				],
				{
					hideScrollbar: false,
					backdropClick: "close",
					keyboard: {
						Escape: "close",
					},
					on: {
						done: (fancybox) => {
							const video = fancybox.container.querySelector("video");
							if (video) {
								video.currentTime = 0;
								video.play();
							}
						},
						close: (fancybox) => {
							const video = fancybox.container.querySelector("video");
							if (video) {
								video.pause();
								video.currentTime = 0;
							}
						},
					},
				},
			);
		});
	});

	// Сохраняем текущий URL и позицию прокрутки перед обновлением
	window.addEventListener("beforeunload", () => {
		sessionStorage.setItem("lastUrl", window.location.href);
		sessionStorage.setItem("scrollPosition", window.scrollY);
	});

	// Восстанавливаем позицию после загрузки, если это та же страница
	window.addEventListener("load", () => {
		const lastUrl = sessionStorage.getItem("lastUrl");
		const scrollPosition = sessionStorage.getItem("scrollPosition");

		// Если предыдущий URL совпадает с текущим - восстанавливаем позицию
		if (lastUrl === window.location.href && scrollPosition) {
			window.scrollTo(0, parseInt(scrollPosition));
		}

		// Очищаем сохранённые данные
		sessionStorage.removeItem("lastUrl");
		sessionStorage.removeItem("scrollPosition");
	});
});