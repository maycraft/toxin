import '@scss/main.scss';
import './landing.scss';
import '@components/header/header';
import '@components/footer/footer';
import '@components/form-search/form-search';

const burmenu = document.querySelector('.burmenu');
const menu = document.querySelector('.header__menu');

burmenu.addEventListener('click', event => {
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

const content = document.querySelector('.content');
let i = 1;
const images = 3;
const delay = 10000;

const intervalID = setInterval(() => {
    if (i > images) i = 1;
    content.style.backgroundImage = `url(/toxin/assets/img/slide-${i}.jpg)`;
    i++;
}, delay);

if (window.innerWidth < 420) {
    clearInterval(intervalID);
    content.style.backgroundImage = 'none';
}
