import './inputmasked.scss';

const InputMask = function () {
    this.opts = this.d;
    this.opts.masked = document.querySelector(this.opts.masked);
    this.refresh(true);
};

const inputMask = {
    // Default Values
    d: {
        masked: '.masked',
        mNum: 'XдДмМгГ9',
        mChar: '_',
        onError() {},
    },

    refresh(init) {
        if (!init) {
            this.opts.masked = document.querySelector(this.opts.masked);
        }

        const t = this.opts.masked;
        const parentClass = t.parentNode?.getAttribute('class');
        if (!parentClass || (parentClass && parentClass.indexOf('shell') === -1)) {
            this.createShell(t);
            this.activateMasking(t);
        }
    },

    // replaces each masked t with a shall containing the t and it's mask.
    createShell(t) {
        const wrap = document.createElement('span');
        const mask = document.createElement('span');
        const emphasis = document.createElement('i');
        emphasis.classList.add('js-date');
        const tClass = t.getAttribute('class');
        const pTxt = t.getAttribute('placeholder');
        const placeholder = document.createTextNode(pTxt);

        t.setAttribute('maxlength', placeholder.length);
        t.setAttribute('data-placeholder', pTxt);
        t.removeAttribute('placeholder');
        if (!tClass || (tClass && tClass.indexOf('masked') === -1)) {
            t.setAttribute('class', `${tClass} masked`);
        }

        mask.setAttribute('aria-hidden', 'true');
        mask.classList.add('mask');
        mask.appendChild(emphasis);
        mask.appendChild(placeholder);

        wrap.setAttribute('class', 'shell');
        wrap.appendChild(mask);
        t.parentNode.insertBefore(wrap, t);
        wrap.appendChild(t);
    },

    setValueOfMask(e) {
        const { value } = e.target;
        const placeholder = e.target.getAttribute('data-placeholder');

        return `<i class="js-date">${value}</i>${placeholder.substr(value.length)}`;
    },

    // add event listeners
    activateMasking(t) {
        t.addEventListener(
            'keyup',
            e => {
                this.handleValueChange.call(this, e);
            },
            false,
        );
    },

    handleValueChange(e) {
        if (e.target.value === document.querySelector('.js-date').innerHTML) {
            return; // Continue only if value hasn't changed
        }
        document.querySelector('.masked').value = this.handleCurrentValue(e);
        document.querySelector('.mask').innerHTML = this.setValueOfMask(e);
    },

    handleCurrentValue(e) {
        const placeholder = e.target.getAttribute('data-placeholder');
        const { value } = e.target;
        const l = placeholder.length;
        let newValue = '';
        const strippedValue = value.replace(/\D/g, '');
        for (let i = 0, j = 0; i < l; i++) {
            const isInt = !Number.isNaN(parseInt(strippedValue[j]));
            const isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
            const matchesNumber = this.opts.mNum.indexOf(placeholder[i]) >= 0;
            const matchesLetter = this.opts.mChar.indexOf(placeholder[i]) >= 0;
            if (matchesNumber && isInt) {
                newValue += strippedValue[j++];
            } else if (
                (!isInt && matchesNumber) ||
                (matchesLetter && !isLetter) ||
                (matchesNumber && !isInt)
            ) {
                // this.opts.onError( e ); // write your own error handling function
                return newValue;
            } else {
                newValue += placeholder[i];
            }
            // break if no characters left and the pattern is non-special character
            if (strippedValue[j] === undefined) {
                break;
            }
        }
        if (e.target.getAttribute('data-valid-example')) {
            return this.validateProgress(e, newValue);
        }
        return newValue;
    },

    validateProgress(e, value) {
        const validExample = e.target.getAttribute('data-valid-example');
        const pattern = new RegExp(e.target.getAttribute('pattern'));
        const placeholder = e.target.getAttribute('data-placeholder');
        const l = value.length;
        let testValue = '';
        // convert to day
        if (l === 1 && placeholder.toUpperCase().substr(0, 2) === 'ДД') {
            if (value > 3 && value < 10) {
                // eslint-disable-next-line
                value = `0${value}`;
            }
            return value;
        }
        // test the value, removing the last character, until what you have is a submatch
        for (let i = l; i >= 0; i--) {
            testValue = value + validExample.substr(value.length);
            if (pattern.test(testValue)) {
                return value;
            }
            // eslint-disable-next-line
            value = value.substr(0, value.length - 1);
        }

        return value;
    },
};

for (const property in inputMask) {
    if (Object.prototype.hasOwnProperty.call(inputMask, property)) {
        InputMask.prototype[property] = inputMask[property];
    }
}
new InputMask();
