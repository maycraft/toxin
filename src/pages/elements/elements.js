import '@scss/main.scss';
import './elements.scss';

import '@components/textfield/textfield';
import '@components/dropdown/dropdown';
import '@components/inputmasked/inputmasked';
import '@components/date-dropdown/date-dropdown';
import '@components/subscription-textfield/subscription-textfield';
import '@components/checkbox-buttons/checkbox-buttons';
import '@components/radio-buttons/radio-buttons';
import '@components/toggle-buttons/toggle-buttons';
import '@components/like-block/like-block';
import '@components/rate-buttons/rate-buttons';
import '@components/richbox-list/richbox-list';
import '@components/range/range';
import '@components/buttons-block/buttons-block';
import '@components/button/button';
import '@components/pagination/pagination';
import '@components/bullet-list/bullet-list';
import '@components/feedback/feedback';
import '@components/benefit-block/benefit-block';
import '@components/checkbox-list/checkbox-list';

const $filterInst = $('#filter').data('datepicker');
$filterInst.selectDate([new Date('2019-08-19'), new Date('2019-08-23')]);
