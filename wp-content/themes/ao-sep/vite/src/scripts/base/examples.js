// Modules
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import WOW from "wow.js";

// Compoments
import ItcCustomSelect from "../components/itc-custom-select";
import ItcMoveEl from "../components/move-elements";
import ShowBlockByTab from "../components/show-block-by-tab";
import { slideToggle } from "../components/slide-toggle";
import modalToggle from "../components/modal-toggle";
import AnchorScroll from "../components/anchor-scroll";
import isMobile from "../helpers/isMobile";

document.addEventListener("DOMContentLoaded", () => {
	new WOW().init();
	new ItcMoveEl();
	new modalToggle();

	// Example ShowBlockByTab
	new ShowBlockByTab(".tabs-container");

	// Example ItcCustomSelect
	const select = new ItcCustomSelect(".custom-select");
	document
		.querySelector(".custom-select")
		.addEventListener("itc.select.change", (e) => {
			const btn = e.target.querySelector(".itc-select__toggle");
			// выбранное значение
			console.log(`Выбранное значение: ${btn.value}`);
			// индекс выбранной опции
			console.log(`Индекс выбранной опции: ${btn.dataset.index}`);
			// выбранный текст опции
			const selected = e.target.querySelector(".itc-select__option_selected");
			const text = selected ? selected.textContent : "";
			console.log(`Выбранный текст опции: ${text}`);
		});

	// AnchorScroll
	new AnchorScroll(100);

	// Lenis smooth scrolling
	let lenis;

	// Initialize Lenis smooth scrolling
	const initSmoothScrolling = () => {
		lenis = new Lenis({
			lerp: 0.2,
			smooth: isMobile() ? false : true,
		});

		lenis.on("scroll", () => ScrollTrigger.update());

		const scrollFn = (time) => {
			lenis.raf(time);
			requestAnimationFrame(scrollFn);
		};

		requestAnimationFrame(scrollFn);
	};

	// Lenis (smooth scrolling)
	initSmoothScrolling();


	// Сделать активной ссылку навигации по блокам в зависимости от того какой блок больше виден на странице
	// const contentBlocks = document.querySelectorAll(".blocks");
	// const navLinks = document.querySelectorAll(".links");

	// contentBlocks.forEach((block, index) => {
	// 	ScrollTrigger.create({
	// 		trigger: block,
	// 		start: "top center",
	// 		end: "bottom center",
	// 		onToggle: (self) => {
	// 			if (self.isActive) {
	// 				navLinks.forEach((link) => link.classList.remove("active"));
	// 				navLinks[index].classList.add("active");
	// 			}
	// 		},
	// 	});
	// });

});
