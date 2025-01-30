import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc.js';
import dayjsTimezone from 'dayjs/plugin/timezone.js';

dayjs.extend(dayjsUtc);
dayjs.extend(dayjsTimezone);
dayjs.tz.setDefault('America/Sao_Paulo');

export const millisecondsToDaysDivisor = 8.64e7;
export const millisecondsToHoursDivisor = 3.6e6;
export const millisecondsToMinutesDivisor = 60000;
export const millisecondsToSecondsDivisor = 1000;

export const secondsToMillis = (seconds) => seconds ? seconds * 1000 : 0;
export const secondsToDays = (seconds) => seconds ? seconds / 86400 : 0;
export const minutesToMillis = (minutes) => secondsToMillis((minutes || 0) * 60);
export const hoursToMillis = (hours) => minutesToMillis((hours || 0) * 60);

export const DateAddType = Object.freeze({
    YEAR: 'YEAR',
    MONTH: 'MONTH',
    DAY: 'DAY',
    HOUR: 'HOUR',
    MINUTE: 'MINUTE',
    SECOND: 'SECOND',
    MILLISECOND: 'MILLISECOND',
});

export const DateUtils = {
    calculaIdade(dataNascimento) {
        return dayjs().diff(dayjs(dataNascimento), 'year');
    },

    calculaParcelasPagas(dataInicioDesconto) {
        return dayjs().diff(dayjs(dataInicioDesconto), 'month') + 1;
    },

    dateAddYear(date, amount) {
        return this.dateAdd(date, amount, DateAddType.YEAR);
    },

    dateAddMonth(date, amount) {
        return this.dateAdd(date, amount, DateAddType.MONTH);
    },

    dateAddDay(date, amount) {
        return this.dateAdd(date, amount, DateAddType.DAY);
    },

    dateAddHour(date, amount) {
        return this.dateAdd(date, amount, DateAddType.HOUR);
    },

    dateAddMinute(date, amount) {
        return this.dateAdd(date, amount, DateAddType.MINUTE);
    },

    dateAddSecond(date, amount) {
        return this.dateAdd(date, amount, DateAddType.SECOND);
    },

    dateAddMillisecond(date, amount) {
        return this.dateAdd(date, amount, DateAddType.MILLISECOND);
    },

    dateAdd(date, amount, field) {
        if (!date || !amount) {
            return date;
        }
        if (!field) {
            throw new Error('DateUtils.dateAdd - Missing field parameter');
        }
        return dayjs(date).add(amount, field.toLowerCase()).toDate();
    },

    format(data = new Date(), format = 'YYYY-MM-DD') {
        return dayjs(data).format(format);
    },

    dateHourToMillisString(date = new Date()) {
        return dayjs(date).format('HH:mm:ss.SSS+Z');
    },

    dateToStringAno(data = new Date()) {
        return dayjs(data).format('DD/MM/YYYY');
    },

    dateToStringMes(data = new Date()) {
        return dayjs(data).format('DD/MM');
    },

    dateToStringYearMonth(data = new Date()) {
        return dayjs(data).format('YYYYMM');
    },

    dateToStringMinutos(data = new Date()) {
        return dayjs(data).format('DD/MM/YYYY HH:mm');
    },

    dateToStringSegundos(data = new Date()) {
        return dayjs(data).format('DD/MM/YYYY HH:mm:ss');
    },

    describeElapsedTimeInMillis(milliseconds) {
        if (!milliseconds || milliseconds <= 0) {
            return ['now'];
        }

        const ret = [];
        let remainingMillis = milliseconds;

        const days = Math.floor(remainingMillis / millisecondsToDaysDivisor);
        if (days > 0) {
            remainingMillis -= days * millisecondsToDaysDivisor;
            ret.push(`${days} dia${days > 1 ? 's' : ''}`);
        }

        const hours = Math.floor(remainingMillis / millisecondsToHoursDivisor);
        if (hours > 0) {
            remainingMillis -= hours * millisecondsToHoursDivisor;
            ret.push(`${hours} hora${hours > 1 ? 's' : ''}`);
        }

        const minutes = Math.floor(remainingMillis / millisecondsToMinutesDivisor);
        if (minutes > 0) {
            remainingMillis -= minutes * millisecondsToMinutesDivisor;
            ret.push(`${minutes} minuto${minutes > 1 ? 's' : ''}`);
        }

        const seconds = Math.floor(remainingMillis / millisecondsToSecondsDivisor);
        if (seconds > 0) {
            remainingMillis -= seconds * millisecondsToSecondsDivisor;
            ret.push(`${seconds} segundo${seconds > 1 ? 's' : ''}`);
        }

        if (remainingMillis > 0) {
            ret.push(`${remainingMillis} millisegundo${remainingMillis > 1 ? 's' : ''}`);
        }

        return ret;
    },

    setDateMinTime(date = new Date()) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    },

    setDateNoonTime(date = new Date()) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
    },

    setDateMaxTime(date = new Date()) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    },

    convertAnyToDate(dateAny) {
        if (!dateAny) {
            return null;
        }

        if (dateAny instanceof Date || typeof dateAny === 'number') {
            return new Date(dateAny);
        }

        const dateString = String(dateAny);
        const patterns = [
            /^(?<day>\d{1,2})\/(?<month>\d{1,2})\/(?<year>\d{4})$/,
            /^(?<day>\d{1,2})-(?<month>\d{1,2})-(?<year>\d{4})$/,
            /^(?<day>\d{1,2})\.(?<month>\d{1,2})\.(?<year>\d{4})$/,
            /^(?<year>\d{4})\/(?<month>\d{1,2})\/(?<day>\d{1,2})$/,
            /^(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})$/,
            /^(?<year>\d{4})\.(?<month>\d{1,2})\.(?<day>\d{1,2})$/,
        ];

        let formattedDateString;
        for (const pattern of patterns) {
            const match = dateString.match(pattern);
            if (match?.groups) {
                const { day, month, year } = match.groups;
                formattedDateString = `${year}-${month}-${day}`;
                break;
            }
        }

        if (!formattedDateString) {
            return null;
        }

        const parsedDate = dayjs(formattedDateString);
        return parsedDate.isValid() ? parsedDate.toDate() : null;
    },
};
