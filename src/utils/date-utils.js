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

/**
 * Calcula a idade a partir da data de nascimento.
 * @param {Date|string|number} dataNascimento
 * @returns {number}
 */
export const calculaIdade = (dataNascimento) => {
    return dayjs().diff(dayjs(dataNascimento), 'year');
};

/**
 * Calcula o número de parcelas pagas a partir da data de início de desconto.
 * @param {Date|string|number} dataInicioDesconto
 * @returns {number}
 */
export const calculaParcelasPagas = (dataInicioDesconto) => {
    return dayjs().diff(dayjs(dataInicioDesconto), 'month') + 1;
};

/**
 * Adiciona um valor à data de acordo com o campo informado.
 * @param {Date|string|number} date - Data base.
 * @param {number} amount - Quantidade a ser adicionada.
 * @param {string} field - Campo a ser adicionado (ano, mês, dia, etc).
 * @returns {Date} - Data ajustada.
 */
export const dateAdd = (date, amount, field) => {
    if (!date || !amount) {
        return date;
    }
    if (!field) {
        throw new Error('dateAdd - Missing field parameter');
    }
    return dayjs(date).add(amount, field.toLowerCase()).toDate();
};

export const dateAddYear = (date, amount) =>
    dateAdd(date, amount, DateAddType.YEAR);
export const dateAddMonth = (date, amount) =>
    dateAdd(date, amount, DateAddType.MONTH);
export const dateAddDay = (date, amount) =>
    dateAdd(date, amount, DateAddType.DAY);
export const dateAddHour = (date, amount) =>
    dateAdd(date, amount, DateAddType.HOUR);
export const dateAddMinute = (date, amount) =>
    dateAdd(date, amount, DateAddType.MINUTE);
export const dateAddSecond = (date, amount) =>
    dateAdd(date, amount, DateAddType.SECOND);
export const dateAddMillisecond = (date, amount) =>
    dateAdd(date, amount, DateAddType.MILLISECOND);

/**
 * Formata a data conforme o formato informado.
 * @param {Date|string|number} [data=new Date()]
 * @param {string} [formatStr='YYYY-MM-DD']
 * @returns {string}
 */
export const format = (data = new Date(), formatStr = 'YYYY-MM-DD') => {
    return dayjs(data).format(formatStr);
};

/**
 * Retorna a data com hora, minutos, segundos, milissegundos e timezone.
 * @param {Date|string|number} [date=new Date()]
 * @returns {string}
 */
export const dateHourToMillisString = (date = new Date()) => {
    return dayjs(date).format('HH:mm:ss.SSS+Z');
};

/**
 * Converte a data para o formato DD/MM/YYYY.
 * @param {Date|string|number} [data=new Date()]
 * @returns {string}
 */
export const dateToStringAno = (data = new Date()) => {
    return dayjs(data).format('DD/MM/YYYY');
};

/**
 * Converte a data para o formato DD/MM.
 * @param {Date|string|number} [data=new Date()]
 * @returns {string}
 */
export const dateToStringMes = (data = new Date()) => {
    return dayjs(data).format('DD/MM');
};

/**
 * Converte a data para o formato YYYYMM.
 * @param {Date|string|number} [data=new Date()]
 * @returns {string}
 */
export const dateToStringYearMonth = (data = new Date()) => {
    return dayjs(data).format('YYYYMM');
};

/**
 * Converte a data para o formato DD/MM/YYYY HH:mm.
 * @param {Date|string|number} [data=new Date()]
 * @returns {string}
 */
export const dateToStringMinutos = (data = new Date()) => {
    return dayjs(data).format('DD/MM/YYYY HH:mm');
};

/**
 * Converte a data para o formato DD/MM/YYYY HH:mm:ss.
 * @param {Date|string|number} [data=new Date()]
 * @returns {string}
 */
export const dateToStringSegundos = (data = new Date()) => {
    return dayjs(data).format('DD/MM/YYYY HH:mm:ss');
};

/**
 * Descreve o tempo decorrido em milissegundos de forma legível.
 * @param {number} milliseconds
 * @returns {string[]}
 */
export const describeElapsedTimeInMillis = (milliseconds) => {
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
};

/**
 * Define o horário mínimo (início do dia) para a data informada.
 * @param {Date|string|number} [date=new Date()]
 * @returns {Date}
 */
export const setDateMinTime = (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
};

/**
 * Define o horário de meio-dia para a data informada.
 * @param {Date|string|number} [date=new Date()]
 * @returns {Date}
 */
export const setDateNoonTime = (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
};

/**
 * Define o horário máximo (final do dia) para a data informada.
 * @param {Date|string|number} [date=new Date()]
 * @returns {Date}
 */
export const setDateMaxTime = (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
};

/**
 * Converte diferentes formatos de data para um objeto Date.
 * @param {any} dateAny
 * @returns {Date|null}
 */
export const convertAnyToDate = (dateAny) => {
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
            const {day, month, year} = match.groups;
            formattedDateString = `${year}-${month}-${day}`;
            break;
        }
    }

    if (!formattedDateString) {
        return null;
    }

    const parsedDate = dayjs(formattedDateString);
    return parsedDate.isValid() ? parsedDate.toDate() : null;
};
