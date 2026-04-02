const radioFields = document.querySelectorAll('.radio-field');
if (radioFields) {
    radioFields.forEach(radio => {
        let box = radio.querySelector('.radio-field__box');
        let label = radio.querySelector('.radio-field__label');
        box.addEventListener('click', toggleRadio);
        label.addEventListener('click', toggleRadio);
    });

    function toggleRadio(e) {
        let target = e.target.closest('.radio-field');
        let name = target.querySelector('input').getAttribute('name');
        let radioGroup = document.querySelectorAll(`input[name="${name}"]`);

        radioGroup.forEach(input => {
            input.parentNode.querySelector('.radio-field__box').classList.remove('active');
        });

        target.querySelector('.radio-field__box').classList.add('active');
        let checkbox = target.querySelector('.radio-field__input');
        checkbox.checked = true;
    }
}