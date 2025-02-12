import {cpf} from 'cpf-cnpj-validator';

import {onlyNumbers} from "./string-utils.js";

/**
 * Gera um número de CPF válido.
 * @param {boolean} [formatted=false] - Define se o CPF deve ser gerado formatado (###.###.###-##).
 * @returns {string} - CPF gerado.
 */
export const generate = (formatted = false) => {
    return cpf.generate(formatted);
};

/**
 * Verifica se um CPF é válido.
 * @param {string|number} value - CPF para validação.
 * @returns {boolean} - Retorna `true` se o CPF for válido, caso contrário, `false`.
 */
export const isValid = (value) => {
    return cpf.isValid(String(value));
};

/**
 * Formata um CPF, adicionando os pontos e traço.
 * @param {string|number} value - CPF a ser formatado.
 * @returns {string} - CPF formatado (###.###.###-##) ou string vazia caso inválido.
 */
export const format = (value) => {
    if (!value) {
        return '';
    }
    value = onlyNumbers(String(value)).padStart(11, '0');
    return cpf.format(value);
};