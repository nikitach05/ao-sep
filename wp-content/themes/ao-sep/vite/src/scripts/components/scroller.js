export default class Scroller {
    constructor(element, offset) {
        this.offset = offset;
        this.element = typeof element === 'string' ? document.querySelector(element) : element;

        if (this.element) {
            this.scrollTo();
        } else {
            console.error(`Element not found.`);
        }
    }

    scrollTo() {
        const elementPosition = this.element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - this.offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}