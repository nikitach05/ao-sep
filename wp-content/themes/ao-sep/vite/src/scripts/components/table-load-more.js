const INITIAL_VISIBLE_ROWS = 5;

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("table.table[data-table]").forEach((table) => {
		const id = table.dataset.table;
		if (id == null || id === "") return;

		const tbody = table.querySelector("tbody");
		if (!tbody) return;

		const rows = [...tbody.querySelectorAll("tr")];
		const btn = document.querySelector(
			`[data-table-load-more="${CSS.escape(String(id))}"]`,
		);

		if (rows.length <= INITIAL_VISIBLE_ROWS) {
			if (btn) btn.hidden = true;
			return;
		}

		if (!btn) return;

		btn.addEventListener("click", () => {
			table.classList.add("is-table-expanded");
			btn.style.display = "none";
		});
	});
});
