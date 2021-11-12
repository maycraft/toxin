import '@scss/main.scss';
import './landing.scss';
import '@components/header/header';
import '@components/footer/footer';
import '@components/form-search/form-search';

const content = document.querySelector('.js-content');
let i = 1;
const images = 3;
const delay = 10000;

const intervalID = setInterval(() => {
    if (i > images) i = 1;
    content.style.backgroundImage = `url(/toxin/assets/img/slide-${i}.jpg)`;
    i++;
}, delay);

if (window.innerWidth < 450) {
    clearInterval(intervalID);
    content.style.backgroundImage = 'none';
}
