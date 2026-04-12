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
			slidesPerView: 2.3,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 3.3,
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
	slidesPerView: "auto",
	spaceBetween: 20,
	loop: false,
	navigation: {
		prevEl: ".hobby-slider .swiper-arrows-prev",
		nextEl: ".hobby-slider .swiper-arrows-next",
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