import './checkbox-list.scss';

const checkboxLists = document.querySelectorAll('.checkbox-list');

checkboxLists.forEach(checkboxList => {
    checkboxList.addEventListener('click', event => {
        if (event.target.classList[0] === 'checkbox-list__title') {
            if (event.target.classList.contains('open')) {
                event.target.classList.remove('open');
                event.target.nextElementSibling.classList.remove('show');
            } else {
                event.target.classList.add('open');
                event.target.nextElementSibling.classList.add('show');
            }
        }
    });
});
