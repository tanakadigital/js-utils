import { v4 as uuidV4 } from 'uuid';

/**
 * Gera um UUID (Universally Unique Identifier) v4.
 * @returns {string} - UUID v4.
 */
export const randomUUID = () => {
    return uuidV4();
};

/**
 * Remove acentos de uma string, mantendo apenas caracteres ASCII.
 * @param {string} str - String de entrada.
 * @returns {string} - String sem acentos.
 */
export const removeAcentos = (str) => {
    if (!str || !str.length) {
        return str;
    }
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Remove todos os caracteres que não sejam dígitos de uma string.
 * Se `defaultNumber` for informado e a string resultante for vazia,
 * retorna `defaultNumber` convertido em string.
 * @param {string} str - String de entrada.
 * @param {number} [defaultNumber] - Valor padrão caso a string fique vazia.
 * @returns {string}
 */
export const onlyNumbers = (str, defaultNumber) => {
    if (!str || !str.length) {
        return defaultNumber ? String(defaultNumber) : str;
    }

    let convert = removerEspacos(str);
    convert = convert.replace(/\D/g, '');

    if (!convert.length && defaultNumber != null) {
        return String(defaultNumber);
    }

    return convert;
};

/**
 * Remove todos os caracteres que não sejam dígitos ou asteriscos (`*`) de uma string.
 * Se `defaultNumber` for informado e a string resultante for vazia,
 * retorna `defaultNumber` convertido em string.
 * @param {string} str - String de entrada.
 * @param {number} [defaultNumber] - Valor padrão caso a string fique vazia.
 * @returns {string}
 */
export const onlyNumbersAndAsterisk = (str, defaultNumber) => {
    if (!str || !str.length) {
        return defaultNumber ? String(defaultNumber) : str;
    }

    let convert = removerEspacos(str);
    convert = convert.replace(/[^0-9*]/g, '');

    if (!convert.length && defaultNumber != null) {
        return String(defaultNumber);
    }

    return convert;
};

/**
 * Ajusta o formato de um telefone celular para o padrão internacional do Brasil (iniciando com +55).
 * - Se o telefone tiver 10 ou 11 dígitos, é prefixado com '55'.
 * - Se não começar com '+', é prefixado com '+'.
 * @param {string} phone - Telefone a ser ajustado.
 * @returns {string} - Telefone formatado.
 */
export const fixMobileNumber = (phone) => {
    if (!phone?.length) {
        return phone;
    }

    phone = onlyNumbers(phone);

    if (phone.length === 10 || phone.length === 11) {
        phone = '55' + phone;
    }

    if (!phone.startsWith('+')) {
        phone = '+' + phone;
    }

    return phone;
};

/**
 * Remove todos os espaços de uma string (incluindo quebras de linha) e faz trim.
 * @param {string} str - String de entrada.
 * @returns {string} - String sem espaços.
 */
export const removerEspacos = (str) => {
    if (!str?.length) {
        return str;
    }
    return str.replace(/\s+/gm, '').trim();
};

/**
 * Retorna o primeiro nome de uma string (considerando o espaço como separador).
 * Transforma a primeira letra em maiúscula e o restante em minúsculas.
 * @param {string} name - Nome completo.
 * @returns {string|null} - Primeiro nome formatado ou `null` se não houver.
 */
export const getFirstName = (name) => {
    if (!name) {
        return null;
    }

    let firstName = name.trim();
    if (firstName.includes(' ')) {
        firstName = firstName.split(' ')[0];
    }

    return firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
};

/**
 * Retorna o primeiro e o último nome de uma string, cada um com a primeira letra maiúscula.
 * Caso só haja um nome, apenas ajusta as letras para Maiúscula/Minúscula.
 * @param {string} name - Nome completo.
 * @returns {string|null}
 */
export const getFirstAndLastName = (name) => {
    if (!name?.length) {
        return null;
    }

    const firstName = name.trim();
    if (firstName.includes(' ')) {
        const names = firstName.split(' ');
        return (
            firstLetterToUpper(names[0]) +
            ' ' +
            firstLetterToUpper(names[names.length - 1])
        );
    }

    return firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
};

/**
 * Transforma a primeira letra em maiúscula e o restante em minúsculas.
 * @param {string} name - String de entrada.
 * @returns {string}
 */
export const firstLetterToUpper = (name) => {
    if (!name?.length || name.length < 2) {
        return name;
    }
    return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
};

/**
 * Converte uma string numérica em Number.
 * Retorna `defaultNumber` caso a string seja vazia ou indefinida.
 * @param {string} str - String de entrada.
 * @param {number} [defaultNumber=0] - Valor padrão.
 * @returns {number}
 */
export const toNumber = (str, defaultNumber = 0) => {
    if (!str?.length) {
        return defaultNumber;
    }
    return Number(str);
};

/**
 * Converte uma string de valor monetário em número, considerando o formato brasileiro.
 * Ex.: '1.234,56' -> 1234.56
 * @param {string} value - String de valor.
 * @returns {number|undefined}
 */
export const stringReaisToNumber = (value) => {
    if (!value?.length) {
        return;
    }
    let ret = value;
    // Se a vírgula estiver num índice maior que o ponto, assumimos formato brasileiro.
    if (ret.indexOf(',') > ret.indexOf('.')) {
        while (ret.indexOf('.') >= 0) {
            ret = ret.replace('.', '');
        }
        ret = ret.replace(',', '.');
    }
    return parseFloat(ret);
};

/**
 * Converte um valor (number ou string formatada) em moeda brasileira (R$).
 * Ex.: 1234.56 -> 'R$ 1.234,56'
 * @param {number|string} value - Valor a ser formatado.
 * @returns {string|null} - Valor em formato monetário ou `null` se inválido.
 */
export const toMonetaryValue = (value) => {
    let ret = null;
    if (!value) {
        return ret;
    }

    if (typeof value === 'string') {
        // Remove caracteres que não sejam números, pontuação de decimal ou vírgula
        value = value.replace(/[^0-9.,]/g, '');
        if (value.includes(',')) {
            // Remove pontos antes de trocar a vírgula, para não confundir casas decimais
            value = value.replace('.', '');
            value = value.replace(',', '.');
        }
        value = parseFloat(value);
    }

    if (typeof value === 'number' && !isNaN(value)) {
        ret = value.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    return ret;
};
