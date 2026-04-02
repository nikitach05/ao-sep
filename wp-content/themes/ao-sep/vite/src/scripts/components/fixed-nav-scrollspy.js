// Fixed navigation item click handler
const fixedNavLinks = document.querySelectorAll(".fixed-nav__item-link");
fixedNavLinks.forEach((link) => {
	link.addEventListener("click", (e) => {
		// Remove active class from all links
		fixedNavLinks.forEach((l) => l.classList.remove("active"));
		// Add active class to clicked link
		link.classList.add("active");
	});
});

// Fixed navigation scrollspy (change active item on scroll)
if (fixedNavLinks.length) {
	const linkToSection = new Map();
	const sections = [];

	fixedNavLinks.forEach((link) => {
		const href = link.getAttribute("href");
		if (!href || !href.startsWith("#") || href === "#") return;

		const section = document.querySelector(href);
		if (!section) return;

		linkToSection.set(link, section);
		sections.push(section);
	});

	const setActiveLink = (activeLink) => {
		if (!activeLink) return;
		fixedNavLinks.forEach((l) =>
			l.classList.toggle("active", l === activeLink),
		);
	};

	const findLinkBySection = (sectionEl) => {
		for (const [link, section] of linkToSection.entries()) {
			if (section === sectionEl) return link;
		}
		return null;
	};

	// Rule: section becomes active when its top is at viewport top minus 100px (i.e. <= 100px)
	// Implementation: pick the last section whose top <= 100px, otherwise pick the first.
	if (sections.length) {
		// Ensure stable order
		sections.sort((a, b) => a.offsetTop - b.offsetTop);

		const TOP_OFFSET = 100;
		let rafId = null;

		const computeActiveSection = () => {
			let current = sections[0];

			for (const section of sections) {
				const top = section.getBoundingClientRect().top;
				if (top - TOP_OFFSET <= 0) current = section;
			}

			const link = findLinkBySection(current);
			if (link) setActiveLink(link);
		};

		const onScrollOrResize = () => {
			if (rafId) return;
			rafId = window.requestAnimationFrame(() => {
				rafId = null;
				computeActiveSection();
			});
		};

		computeActiveSection();
		window.addEventListener("scroll", onScrollOrResize, { passive: true });
		window.addEventListener("resize", onScrollOrResize);
	}
}
