import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
	const root = document.querySelector(".history");
	if (!root) return;

	const historyBlocksEl = root.querySelector(".history-blocks");
	const progressRoot = root.querySelector(".history-progress");
	const lineFill = progressRoot?.querySelector(".history-progress__line-fill");
	const blocks = gsap.utils.toArray(
		root.querySelectorAll(".history-blocks__item"),
	);
	const progressItems = gsap.utils.toArray(
		root.querySelectorAll(".history-progress__item"),
	);

	if (!historyBlocksEl || blocks.length < 2) return;

	const lastIdx = blocks.length - 1;
	const smMq = window.matchMedia("(max-width: 767px)");

	const arrowPrevEls = root.querySelectorAll(".history__arrow-prev");
	const arrowNextEls = root.querySelectorAll(".history__arrow-next");

	const setArrowsDisabled = (idx) => {
		const i = gsap.utils.clamp(0, lastIdx, idx);
		const disPrev = i <= 0;
		const disNext = i >= lastIdx;
		arrowPrevEls.forEach((el) => el.classList.toggle("disable", disPrev));
		arrowNextEls.forEach((el) => el.classList.toggle("disable", disNext));
	};

	const setLineFillInstant = (p01) => {
		if (!lineFill) return;
		gsap.killTweensOf(lineFill);
		gsap.set(lineFill, {
			scaleX: gsap.utils.clamp(0, 1, p01),
			transformOrigin: "left center",
		});
	};

	const setBlockActiveClass = (idx) => {
		const i = gsap.utils.clamp(0, lastIdx, idx);
		blocks.forEach((el, j) => el.classList.toggle("active", j === i));
	};

	const setProgressCumulative = (idx) => {
		const i = gsap.utils.clamp(0, lastIdx, idx);
		progressItems.forEach((el, j) => el.classList.toggle("active", j <= i));
	};

	const initBlockVisibility = (onlyIdx) => {
		blocks.forEach((block, j) => {
			const vis = j === onlyIdx;
			gsap.set(block, { autoAlpha: vis ? 1 : 0, zIndex: vis ? 2 : 0 });
		});
	};

	const TX_DUR = 0.5;
	const TX_EASE = "power1.inOut";

	const playSlideTransition = (from, to) => {
		if (from === to) return Promise.resolve();

		const fb = blocks[from];
		const tb = blocks[to];

		gsap.killTweensOf([fb, tb, lineFill].filter(Boolean));

		gsap.set(tb, { autoAlpha: 0, zIndex: 3 });
		gsap.set(fb, { autoAlpha: 1, zIndex: 2 });

		setBlockActiveClass(to);
		setProgressCumulative(to);

		const fromFill = from / lastIdx;
		const toFill = to / lastIdx;

		return new Promise((resolve) => {
			const tl = gsap.timeline({
				onComplete: () => {
					blocks.forEach((b, j) => {
						if (j !== to) gsap.set(b, { autoAlpha: 0, zIndex: 0 });
					});
					gsap.set(tb, { autoAlpha: 1, zIndex: 2 });
					if (lineFill)
						gsap.set(lineFill, {
							scaleX: toFill,
							transformOrigin: "left center",
						});
					resolve();
				},
			});

			tl.to(fb, { autoAlpha: 0, duration: TX_DUR, ease: TX_EASE }, 0).to(
				tb,
				{ autoAlpha: 1, duration: TX_DUR, ease: TX_EASE },
				0,
			);

			if (lineFill) {
				tl.fromTo(
					lineFill,
					{ scaleX: fromFill, transformOrigin: "left center" },
					{ scaleX: toFill, duration: TX_DUR, ease: TX_EASE },
					0,
				);
			}
		});
	};

	initBlockVisibility(0);
	setBlockActiveClass(0);
	setProgressCumulative(0);
	setLineFillInstant(0);
	setArrowsDisabled(0);

	let activeIndex = 0;
	let isTransitioning = false;

	const scrollToHistoryProgressSmooth = () => {
		if (!smMq.matches || !progressRoot) return;
		const top =
			window.scrollY + progressRoot.getBoundingClientRect().top - 8;
		if (window.__lenis) window.__lenis.scrollTo(top, { duration: 0.85 });
		else window.scrollTo({ top, behavior: "smooth" });
	};

	const goToSlide = (nextIndex) => {
		const next = gsap.utils.clamp(0, lastIdx, nextIndex);
		if (next === activeIndex || isTransitioning) return false;
		const prev = activeIndex;
		activeIndex = next;
		setArrowsDisabled(activeIndex);
		isTransitioning = true;
		playSlideTransition(prev, activeIndex).finally(() => {
			isTransitioning = false;
		});
		return true;
	};

	progressItems.forEach((item, index) => {
		item.addEventListener("click", () => goToSlide(index));
	});

	root.addEventListener("click", (e) => {
		const t = e.target.closest(".history__arrow-prev, .history__arrow-next");
		if (!t || !root.contains(t)) return;
		if (t.classList.contains("disable")) return;
		const moved = t.classList.contains("history__arrow-prev")
			? goToSlide(activeIndex - 1)
			: goToSlide(activeIndex + 1);
		if (moved && smMq.matches) {
			requestAnimationFrame(() => {
				requestAnimationFrame(scrollToHistoryProgressSmooth);
			});
		}
	});
});
