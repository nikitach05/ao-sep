import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
	const pinRoot = document.querySelector(".history__pin");
	if (!pinRoot) return;

	const historyBlocksEl = pinRoot.querySelector(".history-blocks");
	const progressRoot = pinRoot.querySelector(".history-progress");
	const lineFill = progressRoot?.querySelector(".history-progress__line-fill");
	const blocks = gsap.utils.toArray(
		pinRoot.querySelectorAll(".history-blocks__item"),
	);
	const progressItems = gsap.utils.toArray(
		pinRoot.querySelectorAll(".history-progress__item"),
	);

	if (!historyBlocksEl || blocks.length < 2) return;

	const lastIdx = blocks.length - 1;

	const arrowPrev = pinRoot.querySelector(".history__arrow-prev");
	const arrowNext = pinRoot.querySelector(".history__arrow-next");

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
		});
	};

	const TX_DUR = 0.5;
	const TX_EASE = "power1.inOut";

	/** Кроссфейд целого блока; линия прогресса — tween scaleX. */
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
