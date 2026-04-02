import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Clear form fields helper function
function clearFormFields(form) {
	form
		.querySelectorAll(
			'input[type="text"], input[type="tel"], input[type="email"], input[type="password"], textarea'
		)
		.forEach((input) => {
			if (!input.hasAttribute("type") || input.type !== "hidden") {
				input.value = "";
			}
		});
}

// Show button loader
function showButtonLoader(button) {
	const btnLoader = button.querySelector(".btn-loader");

	if (btnLoader) {
		btnLoader.classList.add("show");
		button.classList.add("loading");
		button.disabled = true;
	}
}

// Hide button loader
function hideButtonLoader(button) {
	const btnLoader = button.querySelector(".btn-loader");

	if (btnLoader) {
		btnLoader.classList.remove("show");
		button.classList.remove("loading");
		button.disabled = false;
	}
}

// Sending forms
const formBtn = document.querySelectorAll(".send-form");
formBtn.forEach((btn) => {
	btn.addEventListener("click", async (e) => {
		e.preventDefault();
		let form = btn.closest("form");
		let formData = new FormData(form);
		let fields = form.querySelectorAll(".required");
		let state = validate(fields);
		if (state) {
			showButtonLoader(btn);
			sendForm(formData, form, btn);
		}
	});
});

async function sendForm(formData, form, button = null) {
	let action = "send_form";

	// Determine form type
	// if (form.classList.contains("reg-form")) {
	// 	action = "registration";
	// } else if (form.classList.contains("feedback-form")) {
	// 	action = "send_form";
	// }

	formData.append("action", action);

	try {
		let response = await fetch("/wp-admin/admin-ajax.php", {
			method: "POST",
			body: formData,
		});

		const text = await response.text();
		let result;

		try {
			result = JSON.parse(text);
		} catch (e) {
			console.error("Server response is not valid JSON:", text);
			showNotification(
				"Ошибка сервера. Пожалуйста, попробуйте позже.",
				"error"
			);
			return;
		}

		if (result.success) {
			// Show success notification
			showNotification(
				result.data.message || "Данные успешно сохранены",
				"success"
			);

			if (action === "send_form") {
				// Feedback forms
				Fancybox.close(true);

				Fancybox.show(
					[
						{
							src: "#success-modal",
							type: "inline",
						},
					],
					{
						hideScrollbar: false,
						backdropClick: "close",
						keyboard: {
							Escape: "close",
						},
					}
				);

				// Clear form fields
				clearFormFields(form);
			}

			// Redirect if needed
			if (result.data && result.data.redirect) {
				window.location.href = result.data.redirect;
			}

			// Hide button loader on success
			if (button) {
				hideButtonLoader(button);
			}
		} else {
			// Show error message
			showNotification(result.data.message || "Произошла ошибка", "error");
			
			// Hide button loader on error
			if (button) {
				hideButtonLoader(button);
			}
		}
	} catch (error) {
		console.error("Error sending form:", error);
		showNotification("Произошла ошибка при отправке формы", "error");

		// Hide button loader on error
		if (button) {
			hideButtonLoader(button);
		}
	}
}

function validate(fields) {
	let state = true;
	fields.forEach((input) => {
		if (input.value == "") {
			input.classList.add("error");
			state = false;
		} else {
			input.classList.remove("error");
		}

		if (input.type == "tel") {
			let tel = input.value.replace(/[^0-9]/g, "");
			if (tel.length !== 11) {
				input.classList.add("error");
				state = false;
			} else {
				input.classList.remove("error");
			}
		}

		if (input.type == "email") {
			const email = input.value.trim();
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if (!emailRegex.test(email)) {
				input.classList.add("error");
				state = false;
			} else {
				input.classList.remove("error");
			}
		}

		if (input.type == "checkbox") {
			input.parentNode.classList.toggle("error", !input.checked);

			if (
				input.parentNode.classList.contains("error")
			) {
				state = false;
			}
		}
	});
	return state;
}

// Show notification function
function showNotification(message, type = "success") {
	// Remove existing notifications
	const existingNotifications = document.querySelectorAll(
		".custom-notification"
	);
	existingNotifications.forEach((notif) => notif.remove());

	// Create notification element
	const notification = document.createElement("div");
	notification.className = `custom-notification custom-notification--${type}`;
	notification.innerHTML = `
		<div class="custom-notification__content">
			<span class="custom-notification__message">${message}</span>
		</div>
		<button class="custom-notification__close" onclick="this.parentElement.remove()">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			</svg>
		</button>
	`;

	// Append to body
	// Styles are now in _notification.scss component
	document.body.appendChild(notification);

	// Auto remove after 5 seconds
	setTimeout(() => {
		notification.style.animation = "slideIn 0.3s ease-out reverse";
		setTimeout(() => notification.remove(), 300);
	}, 5000);
}
