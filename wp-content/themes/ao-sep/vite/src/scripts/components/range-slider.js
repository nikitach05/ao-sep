export default function RangeSlider(sliders) {
	if (sliders) {
		sliders.forEach(slider => {
			
			const rangeInput = slider.querySelectorAll(".range-input input"),
			priceInput = slider.querySelectorAll(".price-input input"),
			range = slider.querySelector(".slider .progress");
			let priceGap = 10;
			priceInput.forEach(input => {
				input.addEventListener("input", e => {
					let minPrice = parseInt(priceInput[0].value),
					maxPrice = parseInt(priceInput[1].value);
					
					if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
						if(e.target.className === "input-min"){
							rangeInput[0].value = minPrice;
							range.style.left = (((minPrice - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100) + "%";
						}else{
							rangeInput[1].value = maxPrice;
							range.style.right = ((rangeInput[1].max - maxPrice) / (rangeInput[1].max - rangeInput[1].min) * 100) + "%";
						}
					}
				});
			});
			rangeInput.forEach(input => {
				input.addEventListener("input", e => {
					let minVal = parseInt(rangeInput[0].value),
					maxVal = parseInt(rangeInput[1].value);
					if((maxVal - minVal) < priceGap){
						if(e.target.className === "range-min"){
							rangeInput[0].value = maxVal - priceGap
						}else{
							rangeInput[1].value = minVal + priceGap;
						}
					}else{
						priceInput[0].value = minVal;
						priceInput[1].value = maxVal;
						range.style.left = (((minVal - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100) + "%";
						range.style.right = ((rangeInput[1].max - maxVal) / (rangeInput[1].max - rangeInput[1].min) * 100) + "%";
					}
				});
			});
		});
	}
}