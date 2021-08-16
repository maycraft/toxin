import 'nouislider/dist/nouislider.css';
import * as noUiSlider from 'nouislider';
import './range.scss';

function formatNum(num) {
    if (num < 4) {
        return Math.trunc(num);
    }
    const idx = num.indexOf('.') - 3;
    return `${num.substr(0, idx)} ${num.substr(idx, 3)}`;
}
$(document).ready(() => {
    const slider = document.querySelector('.range__slider');
    if (slider) {
        const min = slider.dataset.min;
        const max = slider.dataset.max;
        const start = slider.dataset.start;
        const end = slider.dataset.end;
        const step = slider.dataset.step;
        const rangeValues = document.querySelector('.range__values');

        noUiSlider.create(slider, {
            start: [5000, 10000],
            connect: true,
            step: 500,
            range: {
                min: 0,
                max: 20000,
            },
        });
        slider.noUiSlider.updateOptions({
            start: [Number.parseInt(start), Number.parseInt(end)],
            range: {
                min: Number.parseInt(min),
                max: Number.parseInt(max),
            },
            step: Number.parseInt(step),
        });
        slider.noUiSlider.on('update', value => {
            rangeValues.innerText = `${formatNum(value[0])}₽ - ${formatNum(value[1])}₽`;
        });
    }
});
