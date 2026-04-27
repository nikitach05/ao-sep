// Modules
import Swiper from "swiper";
import { Navigation } from "swiper/modules";

const partners = new Swiper(".partners-slider", {
	modules: [Navigation],
	slidesPerView: 4,
	spaceBetween: 20,
	loop: false,
	breakpoints: {
		0: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1280: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
	},
});

const hobbies = new Swiper(".hobby-slider__items", {
	modules: [Navigation],
	slidesPerView: 3,
	spaceBetween: 20,
	loop: false,
	navigation: {
		prevEl: ".hobby__arrow-prev",
		nextEl: ".hobby__arrow-next",
	},
	breakpoints: {
		0: {
			spaceBetween: 10,
		},
		768: {
			spaceBetween: 20,
		},
	},
});

document.querySelectorAll(".gallery-slider").forEach((container) => {
	const slider = container.querySelector(".swiper");
	const prev = container.querySelector(".arrows__prev");
	const next = container.querySelector(".arrows__next");
	new Swiper(slider, {
		modules: [Navigation],
		slidesPerView: 3,
		spaceBetween: 20,
		loop: false,
		navigation: {
			prevEl: prev,
			nextEl: next,
		},
		breakpoints: {
			0: {
				spaceBetween: 10,
			},
			768: {
				spaceBetween: 20,
			},
		},
	});
});

const letters = new Swiper(".letters-slider__items", {
	modules: [Navigation],
	slidesPerView: 4,
	spaceBetween: 20,
	loop: false,
	navigation: {
		prevEl: ".letters__arrow-prev",
		nextEl: ".letters__arrow-next",
	},
	breakpoints: {
		0: {
			spaceBetween: 10,
			slidesPerView: 2,
		},
		768: {
			spaceBetween: 20,
			slidesPerView: 3,
		},
		1280: {
			slidesPerView: 4,
		},
	},
});