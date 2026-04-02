export class MaskDate {
    constructor(inputClass = '.date-input') {
        this.inputClass = inputClass; // Селектор для элементов ввода
        this.dateInputs = document.querySelectorAll(this.inputClass); // Находим все элементы по селектору
        this.init();
    }

    // Метод для форматирования даты
    maskDate(event) {
        let value = this.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
        if (value.length > 8) value = value.slice(0, 8); // Ограничиваем длину до 8 цифр

        // Форматируем дату
        if (value.length >= 4) {
            value = value.slice(0, 2) + '.' + value.slice(2, 4) + '.' + value.slice(4);
        } else if (value.length >= 2) {
            value = value.slice(0, 2) + '.' + value.slice(2);
        }

        this.value = value; // Устанавливаем отформатированное значение
    }

    handleBackspace(event) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            const value = this.value;
            const cursorPosition = this.selectionStart;

            // Удаляем точку перед курсором, если она есть
            if (cursorPosition > 0 && (value[cursorPosition - 1] === '.' || value[cursorPosition - 1] === ' ')) {
                this.value = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
                this.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            }
        }
    }

    init() {
        for (const dateInput of this.dateInputs) {
            dateInput.addEventListener('input', this.maskDate.bind(dateInput));
            dateInput.addEventListener('keydown', this.handleBackspace.bind(dateInput));
        }
    }
}

export class MaskPhone {
    constructor(selector, masked = "+7 (___) ___-__-__") {
        this.selector = selector;
        this.masked = masked;
        this.elems = document.querySelectorAll(this.selector);
        this.init();
    }

    mask(event) {
        const keyCode = event.keyCode;
        const template = this.masked,
            def = template.replace(/\D/g, ""),
            val = event.target.value.replace(/\D/g, ""); // Используем event.target.value
        let i = 0,
            newValue = template.replace(/[_\d]/g, (a) => {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = newValue.indexOf("_");
        if (i != -1) {
            newValue = newValue.slice(0, i);
        }
        let reg = template
            .substr(0, event.target.value.length)
            .replace(/_+/g, (a) => {
                return "\\d{1," + a.length + "}";
            })
            .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(event.target.value) || event.target.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
            event.target.value = newValue;
        }
        if (event.type == "blur" && event.target.value.length < 5) {
            event.target.value = "";
        }
    }

    init() {
        for (const elem of this.elems) {
            elem.addEventListener("input", (event) => this.mask(event));
            elem.addEventListener("focus", (event) => this.mask(event));
            elem.addEventListener("blur", (event) => this.mask(event));
        }
    }
}