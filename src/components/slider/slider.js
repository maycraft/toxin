import './slider.scss';

const sliders = document.querySelectorAll('.js-slider');
sliders.forEach(slider => {
    let idx = 0;
    const images = slider.querySelectorAll('img');
    const circles = slider.querySelectorAll('.js-control__circle');
    const arrowPrev = slider.querySelector('.js-slider__arrow-left');
    const arrowNext = slider.querySelector('.js-slider__arrow-right');

    arrowPrev.addEventListener('click', () => {
        images[idx].classList.remove('slider__picture-active');
        circles[idx].classList.remove('control__circle-active');
        idx--;
        if (idx < 0) {
            idx = images.length - 1;
        }
        images[idx].classList.add('slider__picture-active');
        circles[idx].classList.add('control__circle-active');
    });
    arrowNext.addEventListener('click', () => {
        images[idx].classList.remove('slider__picture-active');
        circles[idx].classList.remove('control__circle-active');
        idx++;
        if (idx > images.length - 1) {
            idx = 0;
        }
        images[idx].classList.add('slider__picture-active');
        circles[idx].classList.add('control__circle-active');
    });
});
