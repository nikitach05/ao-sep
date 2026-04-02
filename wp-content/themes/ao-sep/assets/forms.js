// Sending forms
const formBtn = document.querySelectorAll('.send-form');
formBtn.forEach(btn => {
	btn.addEventListener('click', async (e) => {
		e.preventDefault();
		let form = e.target.closest('form');
		let formData = new FormData(form);
		let fields = form.querySelectorAll('.required');
		let state = validate(fields);
		if (state) {
			sendForm(formData);
		}
	});
});

async function sendForm(formData) {
	formData.append('action', 'send_form');
	let response = await fetch('/wp-admin/admin-ajax.php', {
		method: 'POST',
		body: formData
	});
	let result = await response.text();
	
	if (result == 'ok') {

		// ym(88592508, "reachGoal", "success");

		const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.classList.remove('modal--opened'));

		if (formData.get('message')) {
			document.querySelector("#message-success-modal").classList.add("modal--opened", "modal--animated");
		} else {
			document.querySelector("#success-modal").classList.add("modal--opened", "modal--animated");
		}
		
		// Clear input data
		document.querySelectorAll('input[type="text"], textarea, input[type="tel"]').forEach(input => input.value = '');
	}
}

const formReviewBtn = document.querySelectorAll('.send-review-form');
formReviewBtn.forEach((btn) => {
	btn.addEventListener("click", async (e) => {
		e.preventDefault();
		let form = e.target.closest("form");
		let formData = new FormData(form);
		let fields = form.querySelectorAll(".required");
		let state = validate(fields);
		if (state) {
			sendReviewForm(formData);
		}
	});
});

async function sendReviewForm(formData) {
	formData.append('action', 'send_review_form');
	let response = await fetch('/wp-admin/admin-ajax.php', {
		method: 'POST',
		body: formData
	});
	let result = await response.text();
	
	if (result == 'ok') {

		// ym(88592508, "reachGoal", "review");

		const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.classList.remove('modal--opened'));

		document.querySelector("#success-review-modal").classList.add("modal--opened", "modal--animated");
		
		// Clear input data
		document.querySelectorAll('input[type="text"], input[type="tel"], textarea').forEach(input => input.value = '');
	}
}

function validate(fields) {
	let state = true;
	fields.forEach(input => {
		if (input.value == '') {
			input.classList.add('error');
			state = false;
		} else {
			input.classList.remove('error');
		}

		if (input.type == 'tel') {
			let tel = input.value.replace(/[^0-9]/g,"");
			if (tel.length !== 11) {
				input.classList.add('error');
				state = false;
			} else {
				input.classList.remove('error');
			}
		}
		if (input.type == 'checkbox') {
			input.parentNode.querySelector('.checkbox-field__box').classList.toggle('error', !input.checked);

			if (input.parentNode.querySelector('.checkbox-field__box').classList.contains('error')) {
				state = false;
			}
		}
	});
	return state;
}