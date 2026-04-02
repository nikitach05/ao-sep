// Modules
import Swiper from "swiper";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

const slider = new Swiper(".slider__items", {
	modules: [Navigation, Pagination],
	slidesPerView: 3,
	spaceBetween: 20,
	centeredSlides: true,
	loop: true,
	navigation: {
		nextEl: ".slider .swiper-arrows-next",
		prevEl: ".slider .swiper-arrows-prev",
	},
	pagination: {
		el: ".slider .swiper-pagination",
		clickable: false,
	},
	breakpoints: {
		0: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
			centeredSlides: false,
		},
		1320: {
			slidesPerView: 3,
			centeredSlides: true,
		},
	},
});

const galleryThumbsSlider = new Swiper(".gallery-thumbs-slider", {
	slidesPerView: 3,
	spaceBetween: 10,
	speed: 600,
	freeMode: true,
	watchSlidesProgress: true,
	breakpoints: {
		0: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 2,
		},
		1280: {
			slidesPerView: 3,
		},
	},
});

const gallerySlider = new Swiper(".gallery-slider", {
	modules: [Thumbs],
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 600,
	thumbs: {
		swiper: galleryThumbsSlider,
	},
});