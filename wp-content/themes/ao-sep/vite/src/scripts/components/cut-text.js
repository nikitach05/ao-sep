export default class CutText {
    constructor(els, btn, size) {
        this.els = els;
        this.btn = btn;
        this.maxSize = size;
        this.showFullTextHandler = this.showFullTextHandler.bind(this);
        this.init();
    }

    init() {
        document.querySelectorAll(this.els).forEach(el => {
            const parent = el.parentElement;
            const content = el.innerHTML;

            if (!el.dataset.content) {
                const escapedContent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                el.setAttribute('data-content', escapedContent);
            }

            if (el.dataset.content) {
                // if (window.matchMedia('(max-width: 578px)').matches) {
                    const textWithoutHtml = content.replace(/<[^>]*>/g, '');
                    let trimmedText = textWithoutHtml.substring(0, this.maxSize);

                    if (textWithoutHtml.length > this.maxSize) {
                        trimmedText += '...';

                        el.innerHTML = trimmedText;

                        let btnLoadMore = parent.querySelector(this.btn);
                        btnLoadMore.classList.add('show');
                    }
                // }
                // el.innerHTML = el.dataset.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            }
      
        });

        document.querySelectorAll(this.btn).forEach(btn => {
            btn.addEventListener('click', this.showFullTextHandler);
        });
    }

    showFullTextHandler(event) {
        let parent = event.target.parentElement;
        let textDiv = parent.querySelector(this.els);
        event.target.classList.remove('show');
        textDiv.innerHTML = textDiv.dataset.content.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }
  }