import '@scss/main.scss';
import './cards.scss';
import '@components/form-search/form-search';
import '@components/form-registration/form-registration';
import '@components/form-reserv/form-reserv';
import '@components/date-dropdown/date-dropdown';
import '@components/card-room/card-room';

const $dateFilterInst = $('#empty').data('datepicker');
$dateFilterInst.update('startDate', new Date('2019-08-08'));
$dateFilterInst.date = new Date('2019-08-08');
$dateFilterInst.selectDate([new Date('2019-08-19'), new Date('2019-08-23')]);
const allDays = $dateFilterInst.$content.find('.datepicker--cell-day');
allDays.each((i, day) => {
    if (day.dataset.date === '8') {
        day.classList.add('-current-');
    }
});
