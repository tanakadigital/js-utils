/**
 * Mascarar uma string, exibindo apenas os primeiros N caracteres e substituindo o resto por `*`.
 * Se a string for nula ou tiver menos que 4 caracteres, retorna '****'.
 *
 * @param {string} param - String de entrada.
 * @param {number} qtdCaracteresExibidos - Quantidade de caracteres que permanecerão visíveis.
 * @returns {string}
 */
export const mascararString = (param, qtdCaracteresExibidos) => {
    if (!param || param.length <= 4) {
        return '****';
    }

    let retorno = '';
    for (let i = 0; i < param.length; i++) {
        if (param.charAt(i) === ' ') {
            retorno += ' ';
        } else {
            retorno += i >= qtdCaracteresExibidos ? '*' : param.charAt(i);
        }
    }
    return retorno;
};

/**
 * Mascarar a matrícula do INSS.
 *
 * @param {string} matriculaInss
 * @returns {string}
 */
export const mascararMatriculaInss = (matriculaInss) => {
    return mascararString(matriculaInss, 4);
};

/**
 * Mascarar a matrícula do SIAPE.
 *
 * @param {string} matriculaSiape
 * @returns {string}
 */
export const mascararMatriculaSiape = (matriculaSiape) => {
    return mascararString(matriculaSiape, 4);
};

/**
 * Mascarar o contrato de portabilidade. Exibe apenas os últimos 4 dígitos.
 *
 * @param {string} contratoPortabilidade
 * @returns {string}
 */
export const mascararContratoPortabilidade = (contratoPortabilidade) => {
    if (!contratoPortabilidade || contratoPortabilidade.length <= 4) {
        return '****';
    }

    return '*'.repeat(contratoPortabilidade.length - 4) + contratoPortabilidade.slice(-4);
};

/**
 * Mascarar CPF, exibindo apenas os 3 primeiros caracteres e os últimos (após o índice 11).
 * Exemplo: 123.***.***45
 *
 * @param {string} cpf
 * @returns {string|undefined}
 */
export const mascararCPF = (cpf) => {
    if (!cpf?.length) {
        return;
    }
    return cpf.substring(0, 3) + '.***.***' + cpf.substring(11);
};

/**
 * Mascarar telefone, exibindo apenas os 2 primeiros caracteres e os últimos (após o índice 7).
 * Exemplo: 99*****9999
 *
 * @param {string} telefone
 * @returns {string|undefined}
 */
export const mascararTelefone = (telefone) => {
    if (!telefone?.length) {
        return;
    }
    return telefone.substring(0, 2) + '*****' + telefone.substring(7);
};

/**
 * Mascarar email, exibindo apenas os 2 primeiros caracteres e mantendo domínio após o '@'.
 * Exemplo: jo*****@gmail.com
 *
 * @param {string} email
 * @returns {string|undefined}
 */
export const mascararEMail = (email) => {
    if (!email?.length) {
        return;
    }
    let ret = email.substring(0, 2);
    const atIndex = email.indexOf('@');
    for (let i = 2; i < atIndex; i++) {
        ret += '*';
    }
    return ret + email.substring(atIndex);
};

/**
 * Mascarar UUID, exibindo apenas os 4 primeiros e 4 últimos caracteres, substituindo o meio por `*`.
 * Também preserva os traços em suas posições originais.
 *
 * @param {string} uuid
 * @returns {string|undefined}
 */
export const mascararUuid = (uuid) => {
    if (!uuid?.length) {
        return;
    }

    let ret = uuid.substring(0, 4);
    for (let i = 0; i < uuid.length - 8; i++) {
        ret += '*';
    }

    // Ajusta para manter os traços corretos
    if (ret.charAt(8) === '*') ret = ret.substring(0, 8) + '-' + ret.substring(9);
    if (ret.charAt(13) === '*') ret = ret.substring(0, 13) + '-' + ret.substring(14);
    if (ret.charAt(18) === '*') ret = ret.substring(0, 18) + '-' + ret.substring(19);
    if (ret.charAt(23) === '*') ret = ret.substring(0, 23) + '-' + ret.substring(24);

    return ret + uuid.substring(uuid.length - 4);
};

/**
 * Mascarar um nome, exibindo apenas um determinado número de caracteres no início e substituindo o restante por `*`.
 * Se o nome for menor que a quantidade visível, todos caracteres não brancos serão substituídos.
 *
 * @param {string} nome
 * @param {number} caracteresVisiveisPrimeiroNome
 * @returns {string|undefined}
 */
export const mascararNome = (nome, caracteresVisiveisPrimeiroNome) => {
    if (!nome?.length) {
        return;
    }

    if (nome.length > caracteresVisiveisPrimeiroNome) {
        return (
            nome.substring(0, caracteresVisiveisPrimeiroNome) +
            nome.substring(caracteresVisiveisPrimeiroNome).replace(/\S/g, '*')
        );
    }

    return nome.replace(/\S/g, '*');
};
