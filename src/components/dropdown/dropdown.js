import 'item-quantity-dropdown/lib/item-quantity-dropdown.min';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';
import '@components/dropdown-option/dropdown-option';
import '@components/button/button';
import './dropdown.scss';

// Функция для отображения значения в нужном склонении
function declOfWord(n, words) {
    const n1 = (Math.abs(n) % 100) % 10;
    if (n > 10 && n < 20) return words[2];
    if (n1 > 1 && n1 < 5) return words[1];
    if (n1 === 1) return words[0];
    return words[2];
}
// Получаем все блоки с кнопками
const iqDropdownButton = document.querySelectorAll('.iqdropdown-button');
// Пробегаемся по всем блокам
iqDropdownButton.forEach(buttonBlock => {
    buttonBlock.addEventListener('click', event => {
        // И сбрасываем эффект всплытия при нажатии на блоке
        event.stopPropagation();
    });
});
// Получаем все кнопки Применить
const applyBtns = document.querySelectorAll('.iqdropdown-button-apply > button');
applyBtns.forEach(btn => {
    btn.addEventListener('click', event => {
        event.stopPropagation();
        // Получаем текущую кнопку
        const target = event.target;
        // Получаем вышестоящий корневой элемент
        const iqDropdown = target.closest('.iqdropdown');
        // И скрываем его
        iqDropdown.classList.remove('menu-open');
    });
});
// Получаем все кнопки Очистить и пробегаемся по ним
const clearBtns = document.querySelectorAll('.iqdropdown-button-clear > button');
clearBtns.forEach(clearBtn => {
    // проверяем есть ли кнопка, если есть вешаем событие клик
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            // Получаем из кнопки вышестоящий элемент
            const iqDropdownMenu = clearBtn.closest('.iqdropdown-menu');
            // Пробегаемся по каждой строке с элементами
            for (const elem of iqDropdownMenu.children) {
                // Получаем элемент с счётчиком
                const counter = elem.querySelector('.counter');
                // Если он есть и значения этого элемента больше нуля
                if (counter && counter.innerText > 0) {
                    // То получаем кнопку минус
                    const btnMinus = elem.querySelector('.button-decrement');
                    // И вызываем метод клик столько раз, пока значение счётчика не будет равно 0
                    while (counter.innerText > 0) {
                        btnMinus.click();
                    }
                }
            }
        });
    }
});

// объект с настройками
const options = {
    setSelectionText: (itemCount, totalItems) => {
        // Получаем тип элементов
        const dataType = Object.keys(itemCount)[0].replace('1', '');
        // С помощью которого, потом получаем нужный dropdown
        const iqDropdown = document.querySelector(`.iqdropdown[data-dropdown-type=${dataType}]`);
        // Получаем поле с выводом
        const iqSelection = iqDropdown.querySelector('.iqdropdown-selection');
        // Получаем блок с кнопкой clear
        const clearBtnBlock = iqDropdown.querySelector('.iqdropdown-button-clear');

        // Переменная для подсчёта объединённых полей
        let commonCount = 0;
        // Получаем что будет выведенно при начальном состоянии
        const { defaultValue } = iqSelection.dataset;
        // Переменная которая будет содержать в себе массив с вариантами склонения слов,
        // если для конкретного элемента не будет указан data-word-forms
        let commonForms = '';
        // Переменная, которая в конечном итоге будет выводить сообщение о выбранных элементах
        let strValue = '';
        // Получаем название элементов и пробегаемся по ним в цикле
        Array.from(Object.keys(itemCount)).forEach(item => {
            // Получаем количество выбранных элементов для текущего
            const counter = itemCount[item];
            // Получаем нужную колонку отвечающий за текущий элемент
            const el = document.querySelector(`.iqdropdown-menu-option[data-id=${item}]`);
            // Получаем массив с вариантами склонения слов для отображения
            const wordForms = el.dataset.wordForms.split(',');
            // Если data-word-forms пустая, т.е. должно быть общее значение на несколько элементов
            if (!wordForms[0]) {
                // То у родителя берем массив склоняемых слов
                commonForms = el.parentElement.dataset.commonFormText.split(',');
                // складываем для получения общего значения, объединённых полей
                commonCount += counter;
            }
            // получаем кнопку минус
            const btn = el.querySelector('.button-decrement');
            // Если счётчик равен нулю
            if (counter === 0) {
                // то делаем кнопку более светлой
                btn.style.opacity = 0.4;
            } else {
                // Если у счётчека не нулевое значени, то есть 2 варианта
                // // В data-word-form есть значение и используем его
                if (wordForms[0]) {
                    strValue +=
                        strValue.length === 0
                            ? `${counter} ${declOfWord(counter, wordForms)}`
                            : `, ${counter} ${declOfWord(counter, wordForms)}`;
                } else {
                    // Если нет значения, то выводим общее объединённое значени
                    strValue = `${commonCount} ${declOfWord(commonCount, commonForms)}`;
                }
                // восстанавливаем прозрачность
                btn.style.opacity = 1;
            }
        });
        // В зависимости от значения totalItems показываем/скрываем блок с кнопкой Очистить
        if (totalItems > 0) {
            if (clearBtnBlock) clearBtnBlock.classList.remove('hide');
        } else if (clearBtnBlock) {
            clearBtnBlock.classList.add('hide');
        }
        // Выводим строку с текстом по умолчанию, все значения равны 0
        if (totalItems === 0) {
            return defaultValue;
        }
        // Форматируем выводную строку, чтобы больше 19 символов не выводилось, а в конец добавляется многоточие
        if (strValue.length > 19) {
            return strValue.substr(0, 20) + '...';
        }
        // Возвращаем нужную строку
        return strValue;
    },
};
$(document).ready(() => {
    $('.iqdropdown').iqDropdown(options);
});
