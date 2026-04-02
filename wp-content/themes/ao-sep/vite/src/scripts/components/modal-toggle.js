export default class ModalToggle {
  constructor() {
    const toggles = document.querySelectorAll('.modal-toggle');
    const togglesClose = document.querySelectorAll('.modal-toggle__close');

    if (toggles) {
      const handleMouseEvents = (toggle) => {
        const button = toggle.querySelector('.modal-toggle__button');

        if (window.innerWidth > 578) {
          toggle.addEventListener('mouseover', mouseoverEventHandler);
          toggle.addEventListener('mouseout', mouseoutEventHandler);

          button.removeEventListener('click', clickEventHandler);
        } else {
          button.addEventListener('click', clickEventHandler);

          toggle.removeEventListener('mouseover', mouseoverEventHandler);
          toggle.removeEventListener('mouseout', mouseoutEventHandler);
        }
      }

      const mouseoverEventHandler = (e) => {
        let toggle = e.target.closest('.modal-toggle');
        toggle.classList.add('opened');
      }

      const mouseoutEventHandler = (e) => {
        let toggle = e.target.closest('.modal-toggle');
        toggle.classList.remove('opened');
      }

      const clickEventHandler = (e) => {
        let toggle = e.target.closest('.modal-toggle');
        toggle.classList.toggle('opened');
      }

      const resizeEventHandler = () => {
        toggles.forEach((toggle) => {
          handleMouseEvents(toggle);
        });
      }

      window.addEventListener('resize', resizeEventHandler);

      toggles.forEach((toggle) => {
        handleMouseEvents(toggle);
      });
    }

    if (togglesClose) {
      togglesClose.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.target.closest('.modal-toggle').classList.toggle('opened');
        });
      });
    }
  }
}