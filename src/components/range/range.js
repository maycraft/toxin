import 'nouislider/dist/nouislider.css';
import * as noUiSlider from 'nouislider';
import './range.scss';

const slider = document.querySelector('.range__slider');
const rangeValues = document.querySelector('.range__values');
function formatNum(num) {
    if (num < 4) {
        return Math.trunc(num);
    }
    const idx = num.indexOf('.') - 3;
    return `${num.substr(0, idx)} ${num.substr(idx, 3)}`;
}

noUiSlider.create(slider, {
    start: [5000, 10000],
    connect: true,
    step: 500,
    range: {
        min: 0,
        max: 20000,
    },
});

slider.noUiSlider.on('update', value => {
    rangeValues.innerText = `${formatNum(value[0])}₽ - ${formatNum(value[1])}₽`;
});
