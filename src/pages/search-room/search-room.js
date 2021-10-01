import '@scss/main.scss';
import './search-room.scss';
import '@components/header/header';
import '@components/footer/footer';
import '@components/date-dropdown/date-dropdown';
import '@components/dropdown/dropdown';
import '@components/range/range';
import '@components/checkbox-buttons/checkbox-buttons';
import '@components/richbox-list/richbox-list';
import '@components/checkbox-list/checkbox-list';
import '@components/card-room/card-room';
import '@components/pagination/pagination';

const $filterInst = $('#filter').data('datepicker');
$filterInst.selectDate([new Date('2019-08-19'), new Date('2019-08-23')]);
