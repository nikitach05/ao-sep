const checkboxFields = document.querySelectorAll('.checkbox-field');
if (checkboxFields) {
    checkboxFields.forEach(checkbox => {
        let box = checkbox.querySelector('.checkbox-field__box');
        let label = checkbox.querySelector('.checkbox-field__label');
        box.addEventListener('click', toggleCheckbox);
        if (label) {
        label.addEventListener('click', toggleCheckbox);
        }
    });

    function toggleCheckbox(e) {
        let target = e.target.closest('.checkbox-field');
        target.querySelector('.checkbox-field__box').classList.toggle('active');
        let checkbox = target.querySelector('.checkbox-field__input');
        checkbox.checked = (checkbox.checked) ? false : true;
    }
}