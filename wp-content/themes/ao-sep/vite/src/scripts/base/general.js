// Modules
import { OverlayScrollbars } from 'overlayscrollbars';
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Compoments
import '../components/sliders';
import '../components/table-load-more';
import '../components/checkbox';
import isMobile from "../helpers/isMobile";
import modalToggle from "../components/modal-toggle";
import { MaskPhone } from '../components/input-masks';

document.addEventListener('DOMContentLoaded', () => {
	new MaskPhone('input[type="tel"]');
	new modalToggle();

	Fancybox.bind("[data-fancybox]", {
		Thumbs: {
			type: "classic",
		},
		hideScrollbar: false,
	});

	// Lenis smooth scrolling
	let lenis;

	// Initialize Lenis smooth scrolling
	const initSmoothScrolling = () => {
		lenis = new Lenis({
			lerp: 0.2,
			smooth: isMobile() ? false : true,
		});

		// Чтобы ScrollTrigger видел ту же позицию, что и Lenis (иначе pin/триггеры врут).
		window.__lenis = lenis;
		ScrollTrigger.scrollerProxy(window, {
			scrollTop(value) {
				if (arguments.length) lenis.scrollTo(value, { immediate: true });
				return lenis.scroll;
			},
			getBoundingClientRect() {
				return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
			},
		});

		lenis.on("scroll", ScrollTrigger.update);

		const scrollFn = (time) => {
			lenis.raf(time);
			requestAnimationFrame(scrollFn);
		};

		requestAnimationFrame(scrollFn);
	};

	// Lenis (smooth scrolling)
	initSmoothScrolling();

	const tableWrapper = document.querySelectorAll(".table-wrapper");
	tableWrapper.forEach(table => {
		// Custom scrollbar for table
		OverlayScrollbars(table, {});
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
});