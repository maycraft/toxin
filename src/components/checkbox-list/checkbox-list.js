import '../checkbox/checkbox';
import './checkbox-list.scss';

const checkboxLists = document.querySelectorAll('.checkbox-list');
checkboxLists.forEach(checkboxList => {
    checkboxList.addEventListener('click', () => {
        checkboxList.classList.toggle('open');
    });
});
