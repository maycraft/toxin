import './form-reserv.scss';
import '@components/date-dropdown/date-dropdown';
import '@components/dropdown/dropdown';
import '@components/button/button';

const dropDownInst = $('#reservation').data('datepicker');
dropDownInst.date = new Date('2019-08-08');
dropDownInst.selectDate([new Date('2019-08-19'), new Date('2019-08-23')]);
