import $ from 'jquery';
import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';
import './date-filter.scss';

const options = {
    classes: 'date-filter-datepicker',
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
    clearButton: true,
    prevHtml: '<i class="material-icons date-filter__arrow">arrow_back</i>',
    nextHtml: '<i class="material-icons date-filter__arrow">arrow_forward</i>',
    navTitles: {
        days: 'MM yyyy',
    },
    offset: 20,
    showEvent: 'click',
};

const $dateFilterInput = $('.date-filter__input[name="date-filter"]');
const DateInput = $dateFilterInput.datepicker(options).data('datepicker');
const $btnConfirm = $('<span class="datepicker--button-confirm">Применить</span>');
const $dateFilter = $('.date-filter-datepicker');
$dateFilter.children('.datepicker--buttons').append($btnConfirm);

$dateFilter.find('.datepicker--button-confirm').on('click', () => {
    DateInput.hide();
});

$('.date-filter').on('click', () => {
    DateInput.show();
});
