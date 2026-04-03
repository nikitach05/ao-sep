import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initEqualizeServicesTextsHeight } from "./equalize-services-texts";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
	const pinRoot = document.querySelector(".services__pin");
	if (!pinRoot) return;

	const servicesBlocksEl = pinRoot.querySelector(".services-blocks");
	const progressRoot = pinRoot.querySelector(".services-progress");
	const lineFill = progressRoot?.querySelector(".services-progress__line-fill");
	const blocks = gsap.utils.toArray(pinRoot.querySelectorAll(".services-blocks__item"));
	const progressItems = gsap.utils.toArray(pinRoot.querySelectorAll(".services-progress__item"));

	if (!servicesBlocksEl || blocks.length < 2) return;

	initEqualizeServicesTextsHeight(servicesBlocksEl);

	const lastIdx = blocks.length - 1;

	const arrowPrev = pinRoot.querySelector(".services__arrow-prev");
	const arrowNext = pinRoot.querySelector(".services__arrow-next");

	const setArrowsDisabled = (idx) => {
		if (!arrowPrev || !arrowNext) return;
		const i = gsap.utils.clamp(0, lastIdx, idx);
		arrowPrev.classList.toggle("disable", i <= 0);
		arrowNext.classList.toggle("disable", i >= lastIdx);
	};
	// lastIdx шагов по 1vh между слайдами + 0.25vh «хвост» после последнего (не целый +1).
	const scrollDistance = () => (lastIdx + 0.25) * window.innerHeight;

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
			const img = block.querySelector(".services-blocks__image-box");
			const ct = block.querySelector(".services-blocks__content");
			if (img) gsap.set(img, { autoAlpha: vis ? 1 : 0 });
			if (ct) gsap.set(ct, { autoAlpha: vis ? 1 : 0 });
		});
	};

	const TX_DUR = .8;
	const TX_EASE = "power1.inOut";

	/** Картинки и текст — параллельный плавный кроссфейд; линия прогресса — tween scaleX. */
	const playSlideTransition = (from, to) => {
		if (from === to) return Promise.resolve();

		const fb = blocks[from];
		const tb = blocks[to];
		const fromImg = fb.querySelector(".services-blocks__image-box");
		const toImg = tb.querySelector(".services-blocks__image-box");
		const fromCt = fb.querySelector(".services-blocks__content");
		const toCt = tb.querySelector(".services-blocks__content");

		gsap.killTweensOf([fb, tb, fromImg, toImg, fromCt, toCt, lineFill].filter(Boolean));

		gsap.set(tb, { autoAlpha: 1, zIndex: 3 });
		gsap.set(fb, { autoAlpha: 1, zIndex: 2 });
		if (fromImg) gsap.set(fromImg, { autoAlpha: 1 });
		if (toImg) gsap.set(toImg, { autoAlpha: 0 });
		if (fromCt) gsap.set(fromCt, { autoAlpha: 1 });
		if (toCt) gsap.set(toCt, { autoAlpha: 0 });

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
					if (toImg) gsap.set(toImg, { autoAlpha: 1 });
					if (toCt) gsap.set(toCt, { autoAlpha: 1 });
					if (lineFill) gsap.set(lineFill, { scaleX: toFill, transformOrigin: "left center" });
					resolve();
				},
			});

			if (fromImg && toImg) {
				tl.to(fromImg, { autoAlpha: 0, duration: TX_DUR, ease: TX_EASE }, 0).to(
					toImg,
					{ autoAlpha: 1, duration: TX_DUR, ease: TX_EASE },
					0
				);
			}
			if (fromCt && toCt) {
				tl.to(fromCt, { autoAlpha: 0, duration: TX_DUR, ease: TX_EASE }, 0).to(
					toCt,
					{ autoAlpha: 1, duration: TX_DUR, ease: TX_EASE },
					0
				);
			} else if (fromCt) {
				tl.to(fromCt, { autoAlpha: 0, duration: TX_DUR, ease: TX_EASE }, 0);
			} else if (toCt) {
				tl.to(toCt, { autoAlpha: 1, duration: TX_DUR, ease: TX_EASE }, 0);
			}

			if (lineFill) {
				tl.fromTo(
					lineFill,
					{ scaleX: fromFill, transformOrigin: "left center" },
					{ scaleX: toFill, duration: TX_DUR, ease: TX_EASE },
					0
				);
			}
		});
	};

	const mm = gsap.matchMedia();

	mm.add("(min-width: 768px)", () => {
		initBlockVisibility(0);
		setBlockActiveClass(0);
		setProgressCumulative(0);
		setLineFillInstant(0);
		setArrowsDisabled(0);

		let activeIndex = 0;
		let isTransitioning = false;

		// window.scrollTo обходит Lenis — для шагов по слайдам нужен scrollTo у Lenis.
		const scrollDocumentTo = (y) => {
			if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
			else window.scrollTo(0, y);
			ScrollTrigger.update();
		};

		const st = ScrollTrigger.create({
			trigger: pinRoot,
			start: "top top",
			end: () => `+=${scrollDistance()}`,
			pin: true,
			pinSpacing: true,
			anticipatePin: 1,
			invalidateOnRefresh: true,
		});

		const scrollToIndex = (i) => {
			const idx = gsap.utils.clamp(0, lastIdx, i);
			const span = lastIdx + 0.25;
			const y = st.start + (idx / span) * (st.end - st.start);
			scrollDocumentTo(y);
		};

		const goToSlide = (nextIndex) => {
			const next = gsap.utils.clamp(0, lastIdx, nextIndex);
			if (next === activeIndex || isTransitioning) return;
			const prev = activeIndex;
			activeIndex = next;
			setArrowsDisabled(activeIndex);
			isTransitioning = true;
			scrollToIndex(activeIndex);
			playSlideTransition(prev, activeIndex).finally(() => {
				isTransitioning = false;
			});
		};

		const onWheel = (e) => {
			if (!st.isActive) return;

			if (isTransitioning) {
				e.preventDefault();
				return;
			}

			const dy = e.deltaY;
			if (dy === 0) return;

			const dir = dy > 0 ? 1 : -1;

			if (activeIndex >= lastIdx && dir > 0) return;
			if (activeIndex <= 0 && dir < 0) return;

			e.preventDefault();
			goToSlide(activeIndex + dir);
		};

		window.addEventListener("wheel", onWheel, { passive: false });

		const removers = progressItems.map((item, index) => {
			const fn = () => goToSlide(index);
			item.addEventListener("click", fn);
			return () => item.removeEventListener("click", fn);
		});

		const onArrowPrev = () => {
			if (arrowPrev?.classList.contains("disable")) return;
			goToSlide(activeIndex - 1);
		};
		const onArrowNext = () => {
			if (arrowNext?.classList.contains("disable")) return;
			goToSlide(activeIndex + 1);
		};
		arrowPrev?.addEventListener("click", onArrowPrev);
		arrowNext?.addEventListener("click", onArrowNext);

		return () => {
			arrowPrev?.removeEventListener("click", onArrowPrev);
			arrowNext?.removeEventListener("click", onArrowNext);
			window.removeEventListener("wheel", onWheel);
			st.kill();
			gsap.killTweensOf(blocks);
			gsap.set(blocks, { clearProps: "opacity,visibility" });
			removers.forEach((r) => r());
		};
	});

	mm.add("(max-width: 767px)", () => {
		initBlockVisibility(0);
		setBlockActiveClass(0);
		setProgressCumulative(0);
		setLineFillInstant(0);
		setArrowsDisabled(0);

		let isTransitioning = false;

		const removers = progressItems.map((item, index) => {
			const fn = () => {
				const current = blocks.findIndex((b) => b.classList.contains("active"));
				if (current === index || isTransitioning) return;
				isTransitioning = true;
				playSlideTransition(current, index).finally(() => {
					isTransitioning = false;
					setArrowsDisabled(index);
				});
			};
			item.addEventListener("click", fn);
			return () => item.removeEventListener("click", fn);
		});

		const onArrowPrev = () => {
			if (arrowPrev?.classList.contains("disable")) return;
			const current = blocks.findIndex((b) => b.classList.contains("active"));
			if (current <= 0 || isTransitioning) return;
			const next = current - 1;
			isTransitioning = true;
			playSlideTransition(current, next).finally(() => {
				isTransitioning = false;
				setArrowsDisabled(next);
			});
		};
		const onArrowNext = () => {
			if (arrowNext?.classList.contains("disable")) return;
			const current = blocks.findIndex((b) => b.classList.contains("active"));
			if (current >= lastIdx || isTransitioning) return;
			const next = current + 1;
			isTransitioning = true;
			playSlideTransition(current, next).finally(() => {
				isTransitioning = false;
				setArrowsDisabled(next);
			});
		};
		arrowPrev?.addEventListener("click", onArrowPrev);
		arrowNext?.addEventListener("click", onArrowNext);

		return () => {
			arrowPrev?.removeEventListener("click", onArrowPrev);
			arrowNext?.removeEventListener("click", onArrowNext);
			gsap.killTweensOf(blocks);
			gsap.set(blocks, { clearProps: "opacity,visibility" });
			removers.forEach((r) => r());
		};
	});

	let resizeTimer;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
	});

	window.addEventListener("load", () => ScrollTrigger.refresh());
});
