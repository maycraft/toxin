import './inputmasked.scss';

const InputMask = function (opts) {
    if (opts && opts.masked) {
        // Make it easy to wrap this plugin and pass elements instead of a selector
        // eslint-disable-next-line
        opts.masked =
            typeof opts.masked === 'string' ? document.querySelectorAll(opts.masked) : opts.masked;
    }

    if (opts) {
        this.opts = {
            masked: opts.masked || document.querySelectorAll(this.d.masked),
            mNum: opts.mNum || this.d.mNum,
            mChar: opts.mChar || this.d.mChar,
            error: opts.onError || this.d.onError,
        };
    } else {
        this.opts = this.d;
        this.opts.masked = document.querySelectorAll(this.opts.masked);
    }

    this.refresh(true);
};

const inputMask = {
    // Default Values
    d: {
        masked: '.masked',
        mNum: 'XdDmMyY9',
        mChar: '_',
        onError() {},
    },

    refresh(init) {
        let t;
        let parentClass;

        if (!init) {
            this.opts.masked = document.querySelectorAll(this.opts.masked);
        }

        for (i = 0; i < this.opts.masked.length; i++) {
            t = this.opts.masked[i];
            parentClass = t.parentNode.getAttribute('class');

            if (!parentClass || (parentClass && parentClass.indexOf('shell') === -1)) {
                this.createShell(t);
                this.activateMasking(t);
            }
        }
    },

    // replaces each masked t with a shall containing the t and it's mask.
    createShell(t) {
        const wrap = document.createElement('span');
        const mask = document.createElement('span');
        const emphasis = document.createElement('i');
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
        mask.setAttribute('id', `${t.getAttribute('id')}Mask`);
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

        return `<i>${value}</i>${placeholder.substr(value.length)}`;
    },

    // add event listeners
    activateMasking(t) {
        const that = this;
        if (t.addEventListener) {
            // remove "if" after death of IE 8
            t.addEventListener(
                'keyup',
                e => {
                    that.handleValueChange.call(that, e);
                },
                false,
            );
        } else if (t.attachEvent) {
            // For IE 8
            t.attachEvent('onkeyup', e => {
                e.target = e.srcElement;
                that.handleValueChange.call(that, e);
            });
        }
    },

    handleValueChange(e) {
        const id = e.target.getAttribute('id');

        if (e.target.value === document.querySelector(`#${id}Mask i`).innerHTML) {
            return; // Continue only if value hasn't changed
        }

        document.getElementById(id).value = this.handleCurrentValue(e);
        document.getElementById(`${id}Mask`).innerHTML = this.setValueOfMask(e);
    },

    handleCurrentValue(e) {
        const isCharsetPresent = e.target.getAttribute('data-charset');
        const placeholder = isCharsetPresent || e.target.getAttribute('data-placeholder');
        const { value } = e.target;
        const l = placeholder.length;
        let newValue = '';
        let i;
        let j;
        let isInt;
        let isLetter;

        // strip special characters
        const strippedValue = isCharsetPresent
            ? value.replace(/\W/g, '')
            : value.replace(/\D/g, '');

        for (i = 0, j = 0; i < l; i++) {
            isInt = !Number.isNaN(parseInt(strippedValue[j]));
            isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
            matchesNumber = this.opts.mNum.indexOf(placeholder[i]) >= 0;
            matchesLetter = this.opts.mChar.indexOf(placeholder[i]) >= 0;
            if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {
                newValue += strippedValue[j++];
            } else if (
                (!isCharsetPresent && !isInt && matchesNumber) ||
                (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))
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

        // convert to months
        if (l === 1 && placeholder.toUpperCase().substr(0, 2) === 'MM') {
            if (value > 1 && value < 10) {
                // eslint-disable-next-line
                value = `0${value}`;
            }
            return value;
        }
        // test the value, removing the last character, until what you have is a submatch
        for (i = l; i >= 0; i--) {
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
    // if (inputMask.hasOwnProperty(property)) {
    if (Object.prototype.hasOwnProperty.call(inputMask, property)) {
        InputMask.prototype[property] = inputMask[property];
    }
}

//  Declaritive initalization
(function () {
    const scripts = document.getElementsByTagName('script');
    const script = scripts[scripts.length - 1];
    if (script.getAttribute('data-autoinit')) {
        new InputMask();
    }
})();
