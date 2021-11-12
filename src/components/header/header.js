import './header.scss';
import '@components/brand/brand';
import '@components/button/button';

const burgerMenu = document.querySelector('.js-burger-menu');
const menu = document.querySelector('.js-header__menu');

burgerMenu.addEventListener('click', event => {
    event.preventDefault();
    if (!menu.classList.contains('show')) {
        menu.classList.add('show');
        menu.style.height = 'auto';
        const height = menu.clientHeight + 'px';
        menu.style.height = '0px';

        setTimeout(() => {
            menu.style.height = height;
        }, 0);
    } else {
        menu.style.height = '0px';
        menu.addEventListener(
            'transitionend',
            () => {
                menu.classList.remove('show');
                menu.style.height = 'auto';
            },
            { once: true },
        );
    }
});
