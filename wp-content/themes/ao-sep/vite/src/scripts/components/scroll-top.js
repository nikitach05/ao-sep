export default class ScrollTop {
  constructor(element, topIndent) {
      this.button = document.querySelector(element);
      this.topIndent = topIndent;
      this.init();
  }

  init() {
    this.button.style.opacity = 0;
    
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition >= this.topIndent) {
            this.button.style.opacity = 1;
            this.button.style.pointerEvents = 'all';
        } else {
            this.button.style.opacity = 0;
            this.button.style.pointerEvents = 'none';
        }

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });
    });
  }
}