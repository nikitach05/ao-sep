/**
 * Notification component
 * Система уведомлений для всего сайта
 */

/**
 * Показать уведомление
 * @param {string} message - Текст уведомления
 * @param {string} type - Тип уведомления: 'success' или 'error'
 */
export function showNotification(message, type = 'success') {
	// Remove existing notifications
	const existingNotifications = document.querySelectorAll('.custom-notification');
	existingNotifications.forEach(notif => notif.remove());

	// Create notification element
	const notification = document.createElement('div');
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
	// Styles are in _notification.scss component
	document.body.appendChild(notification);

	// Auto remove after 5 seconds
	setTimeout(() => {
		notification.style.animation = 'slideIn 0.3s ease-out reverse';
		setTimeout(() => notification.remove(), 300);
	}, 5000);
}

export default showNotification;

