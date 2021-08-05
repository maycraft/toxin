import $ from 'jquery';
import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';
import './date-filter.scss';

const $dateFilterInput = $('.date-filter__input');

const options = {
    range: true,
    multipleDatesSeparator: ' - ',
    language: {
        monthsShort: [
            'янв',
            'фев',
            'мар',
            'апр',
            'май',
            'июн',
            'июл',
            'авг',
            'сен',
            'окт',
            'ноя',
            'дек',
        ],
    },
    dateFormat: 'dd M',
    // inline: true,
    clearButton: true,
    prevHtml: '<i class="material-icons date-filter__arrow">arrow_back</i>',
    nextHtml: '<i class="material-icons date-filter__arrow">arrow_forward</i>',
    navTitles: {
        days: 'MM yyyy',
    },
    offset: 20,
    // showEvent: 'click',
};
const Datepicker = $dateFilterInput.datepicker(options).data('datepicker');
const $btnConfirm = $('<span class="datepicker--button-confirm">Применить</span>');
$('.datepicker--buttons').append($btnConfirm);

$('.datepicker--button-confirm').on('click', () => {
    Datepicker.hide();
});

$('.date-filter').on('click', () => {
    Datepicker.show();
});
