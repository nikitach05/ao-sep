document.addEventListener("DOMContentLoaded", () => {
	const mapElement = document.querySelector("#map");
	if (mapElement) {
		let myMap;
		function init() {
			const coords = mapElement.dataset.coords;
			const coordsCenter = mapElement.dataset.coordsCenter;
			const markerSrc = mapElement.dataset.marker;

			// Map
			myMap = new ymaps.Map("map", {
				center: JSON.parse(coordsCenter),
				zoom: 17,
				controls: [],
			});

			const balloon = {
				iconLayout: "default#image",
				iconImageHref: markerSrc,
				iconImageSize: [100, 82],
				iconImageOffset: [-50, -82],
				// balloonContentSize: [302, 194],
				// balloonLayout: "default#imageWithContent",
				// balloonImageHref: 'img/svg/balloon.svg',
				// balloonImageOffset: [-15, 28],
				// balloonImageSize: [302, 194]
			};

			myMap.geoObjects.add(
				new ymaps.Placemark(
					JSON.parse(coords),
					{
						balloonContent:
							'<div class="balloon">Адрес: Площадь Журавлева, д.6, Москва, Россия</div>',
					},
					balloon,
				),
			);

			myMap.behaviors.disable("scrollZoom");

			var zoomControl = new ymaps.control.ZoomControl({
				options: {
					size: "small",
				},
			});
			myMap.controls.add(zoomControl);
		}

		// Отложеная загрузка при видимости элемента карты
		const apiUrl =
			"https://api-maps.yandex.ru/2.1/?apikey=0e646ded-eed5-469c-9f22-2aa509094b7b&lang=ru_RU";
		const iObserver = new IntersectionObserver(
			function (entries) {
				if (entries[0].isIntersecting === true) {
					loadMap();
					iObserver.unobserve(entries[0].target); // перестаём отслеживать видимость
				}
			},
			{ threshold: [0] }
		); // от 0 до 1, % видимой части элемента на экране

		iObserver.observe(document.getElementById("map"));

		function loadMap() {
			let map = document.getElementById("map");
			if (!map.classList.contains("js--loaded")) {
				map.classList.add("js--loaded");

				if (typeof ymaps === "undefined") {
					let js = document.createElement("script");
					js.src = apiUrl;
					document.getElementsByTagName("head")[0].appendChild(js);
					js.onload = function () {
						ymaps.ready(init);
					};
					js.onerror = function () {
						console.log("error load ymaps");
					};
				} else {
					ymaps.ready(init);
				}
			}
		}
	}
});
