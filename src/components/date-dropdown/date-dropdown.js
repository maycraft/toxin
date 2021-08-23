import $ from 'jquery';
import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';
import './date-dropdown.scss';

let isOpen = false;
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
    onSelect(fd, date, inst) {
        const $dateDropdown = inst.$el.closest('.date-dropdown');
        $dateDropdown.find('.date-dropdown__input-start').val(fd.split('-')[0]);
        $dateDropdown.find('.date-dropdown__input-end').val(fd.split('-')[1]);
    },
};
const $dateDropdownInputs = $('.date-dropdown__input');
$dateDropdownInputs.each(function () {
    const idVal = $(this).attr('id');
    if (idVal) {
        const $dateDropdownEl = $(`#${idVal}`).datepicker(options);
        const DDInst = $dateDropdownEl.data('datepicker');
        const $btnConfirm = $('<span class="datepicker--button-confirm">Применить</span>');
        const $dateDropdown = $(`.${DDInst.opts.classes}`);
        $dateDropdown.children('.datepicker--buttons').append($btnConfirm);

        $dateDropdown.find('.datepicker--button-confirm').on('click', () => {
            DDInst.hide();
        });

        $dateDropdownEl.parent('.date-dropdown-block').on('click', () => {
            if (isOpen) {
                DDInst.hide();
            } else {
                DDInst.show();
            }
            isOpen = !isOpen;
        });
    }
});
