import { v4 as uuidV4 } from 'uuid';

export const StringUtils = {
    randomUUID() {
        return uuidV4();
    },

    removeAcentos(str) {
        if (!str || !str.length) {
            return str;
        }
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },

    onlyNumbers(str, defaultNumber) {
        if (!str || !str.length) {
            return defaultNumber ? String(defaultNumber) : str;
        }

        let convert = this.removerEspacos(str);
        convert = convert.replace(/\D/g, '');

        if (!convert.length && defaultNumber != null) {
            return String(defaultNumber);
        }

        return convert;
    },

    onlyNumbersAndAsterisk(str, defaultNumber) {
        if (!str || !str.length) {
            return defaultNumber ? String(defaultNumber) : str;
        }

        let convert = this.removerEspacos(str);
        convert = convert.replace(/[^0-9*]/g, '');

        if (!convert.length && defaultNumber != null) {
            return String(defaultNumber);
        }

        return convert;
    },

    fixMobileNumber(phone) {
        if (!phone?.length) {
            return phone;
        }

        phone = StringUtils.onlyNumbers(phone);

        if (phone.length === 10 || phone.length === 11) {
            phone = '55' + phone;
        }

        if (!phone.startsWith('+')) {
            phone = '+' + phone;
        }

        return phone;
    },

    removerEspacos(str) {
        if (!str?.length) {
            return str;
        }
        return str.replace(/\s+/gm, '').trim();
    },

    getFirstName(name) {
        if (!name) {
            return null;
        }

        let firstName = name.trim();
        if (firstName.includes(' ')) {
            firstName = firstName.split(' ')[0];
        }

        return firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
    },

    getFirstAndLastName(name) {
        if (!name?.length) {
            return null;
        }

        const firstName = name.trim();
        if (firstName.includes(' ')) {
            const names = firstName.split(' ');
            return this.firstLetterToUpper(names[0]) + ' ' + this.firstLetterToUpper(names[names.length - 1]);
        }

        return firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
    },

    firstLetterToUpper(name) {
        if (!name?.length || name.length < 2) {
            return name;
        }
        return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    },

    toNumber(str, defaultNumber = 0) {
        if (!str?.length) {
            return defaultNumber;
        }
        return Number(str);
    },

    stringReaisToNumber(value) {
        if (!value?.length) {
            return;
        }
        let ret = value;
        if (ret.indexOf(',') > ret.indexOf('.')) {
            while (ret.indexOf('.') >= 0) {
                ret = ret.replace('.', '');
            }
            ret = ret.replace(',', '.');
        }
        return parseFloat(ret);
    },

    toMonetaryValue(value) {
        let ret = null;
        if (!value) {
            return ret;
        }

        if (typeof value === 'string') {
            value = value.replace(/[^0-9.,]/g, '');
            if (value.includes(',')) {
                value = value.replace('.', '');
                value = value.replace(',', '.');
            }
            value = parseFloat(value);
        }

        if (typeof value === 'number') {
            ret = value.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
            });
        }

        return ret;
    },
};
