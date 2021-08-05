import $ from 'jquery';
import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';
import './date-dropdown.scss';

const options = {
    classes: 'date-dropdown-datepicker',
    range: true,
    multipleDatesSeparator: '-',
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
    dateFormat: 'dd.mm.yyyy',
    // inline: true,
    clearButton: true,
    prevHtml: '<i class="material-icons date-filter__arrow">arrow_back</i>',
    nextHtml: '<i class="material-icons date-filter__arrow">arrow_forward</i>',
    navTitles: {
        days: 'MM yyyy',
    },
    offset: 20,
    showEvent: 'click',
    onSelect(fd) {
        $('.date-dropdown__input-start').val(fd.split('-')[0]);
        $('.date-dropdown__input-end').val(fd.split('-')[1]);
    },
};

const $dateDropdownInput = $('.date-dropdown__input[name="date-dropdown"]');
const DateDropdown = $dateDropdownInput.datepicker(options).data('datepicker');
const $btnConfirm = $('<span class="datepicker--button-confirm">Применить</span>');
const $dateDropdown = $('.date-dropdown-datepicker');
$dateDropdown.children('.datepicker--buttons').append($btnConfirm);

$dateDropdown.find('.datepicker--button-confirm').on('click', () => {
    DateDropdown.hide();
});

$('.date-dropdown-block').on('click', () => {
    DateDropdown.show();
});
