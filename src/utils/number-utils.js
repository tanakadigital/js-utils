export const NumberUtils = {
    /**
     * Converte uma string para número.
     * Se a conversão falhar, retorna um valor padrão.
     * @param {string|number} value - Valor a ser convertido.
     * @param {number} [defaultNumber=0] - Valor padrão caso a conversão falhe.
     * @returns {number} - Número convertido.
     */
    toNumber(value, defaultNumber = 0) {
        const num = Number(value);
        return isNaN(num) ? defaultNumber : num;
    },

    /**
     * Arredonda um número para 2 casas decimais.
     * @param {number} value - Número a ser arredondado.
     * @returns {number} - Número arredondado.
     */
    roundTwoDecimals(value) {
        return Math.round(value * 100) / 100;
    },

    /**
     * Formata um número como moeda no formato brasileiro (R$ 1.234,56).
     * @param {number} value - Valor numérico.
     * @returns {string} - Valor formatado como moeda.
     */
    formatCurrencyBR(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    },

    /**
     * Gera um número aleatório dentro de um intervalo.
     * @param {number} min - Valor mínimo.
     * @param {number} max - Valor máximo.
     * @returns {number} - Número aleatório entre `min` e `max`.
     */
    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Retorna `true` se o número for inteiro.
     * @param {number} value - Valor a ser verificado.
     * @returns {boolean} - `true` se for inteiro, caso contrário, `false`.
     */
    isInteger(value) {
        return Number.isInteger(value);
    },

    /**
     * Retorna `true` se o número for um decimal.
     * @param {number} value - Valor a ser verificado.
     * @returns {boolean} - `true` se for decimal, caso contrário, `false`.
     */
    isDecimal(value) {
        return !Number.isInteger(value);
    },

    /**
     * Converte um valor monetário formatado (`1.234,56` ou `1,234.56`) para número.
     * @param {string} value - String contendo um valor monetário.
     * @returns {number|null} - Valor convertido ou `null` caso inválido.
     */
    parseMonetaryValue(value) {
        if (!value) return null;

        // Remove caracteres inválidos e substitui vírgulas por pontos se necessário
        let sanitizedValue = value.replace(/[^0-9,.-]/g, '');
        if (sanitizedValue.includes(',')) {
            sanitizedValue = sanitizedValue.replace(/\./g, '').replace(',', '.');
        }

        const num = parseFloat(sanitizedValue);
        return isNaN(num) ? null : num;
    }
};
