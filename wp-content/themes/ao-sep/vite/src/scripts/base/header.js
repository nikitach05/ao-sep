import { slideToggle } from "../components/slide-toggle";

document.addEventListener("DOMContentLoaded", () => {
	// Mobile menu btn toggle
	const btnMenu = document.querySelector(".menu-toggle");
	btnMenu.addEventListener("click", onClicktoggleMenu);

	document
		.querySelector(".mobile-menu__close")
		.addEventListener("click", onClicktoggleMenu);

	function onClicktoggleMenu(e) {
		toggleMenu();

		if (
			document
				.querySelector(".mobile-menu")
				.classList.contains("mobile-menu--opened")
		) {
			bodyHidden(true);
		} else {
			bodyHidden(false);
		}
	}

	function toggleMenu() {
		document.querySelector(".header").classList.toggle("header--blur");
		document
			.querySelector(".mobile-menu")
			.classList.toggle("mobile-menu--opened");
	}

	function bodyHidden(state) {
		if (state) {
			document.body.classList.add("hidden");
		} else {
			document.body.classList.remove("hidden");
		}
	}

	// Set height for mobile menu
	window.addEventListener("resize", () => {
		requestAnimationFrame(setMenuHeight);
	});

	function setMenuHeight() {
		const menu = document.querySelector(".mobile-menu");
		menu.style.height = window.innerHeight + "px";
	}

	setMenuHeight();

	// Mobile submenu accordion (slideToggle)
	const mobileMenuList = document.querySelector(".mobile-menu__list");
	if (mobileMenuList) {
		const toggleMobileSubmenu = (item) => {
			const submenu = item.querySelector(".mobile-menu__submenu");
			if (!submenu) return;
			slideToggle(submenu, 300, "flex");
			item.classList.toggle("mobile-menu__list-item--open");
		};

		mobileMenuList.addEventListener("click", (e) => {
			const head = e.target.closest(".mobile-menu__list-head");
			if (!head) return;
			const item = head.closest(".mobile-menu__list-item--has-submenu");
			if (!item) return;
			e.preventDefault();
			toggleMobileSubmenu(item);
		});

		mobileMenuList.addEventListener("keydown", (e) => {
			if (e.key !== "Enter" && e.key !== " ") return;
			const trigger = e.target.closest(".mobile-menu__list-trigger");
			if (!trigger) return;
			const item = trigger.closest(".mobile-menu__list-item--has-submenu");
			if (!item) return;
			e.preventDefault();
			toggleMobileSubmenu(item);
		});
	}
});
