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
		1320: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
	},
});