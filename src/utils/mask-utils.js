export const MaskUtils = {
    mascararMatriculaInss(matriculaInss) {
        return this.mascararString(matriculaInss, 4);
    },

    mascararMatriculaSiape(matriculaSiape) {
        return this.mascararString(matriculaSiape, 4);
    },

    mascararContratoPortabilidade(contratoPortabilidade) {
        if (!contratoPortabilidade || contratoPortabilidade.length <= 4) {
            return '****';
        }

        return '*'.repeat(contratoPortabilidade.length - 4) + contratoPortabilidade.slice(-4);
    },

    mascararString(param, qtdCaracteresExibidos) {
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
    },

    mascararCPF(cpf) {
        if (!cpf?.length) {
            return;
        }
        return cpf.substring(0, 3) + '.***.***' + cpf.substring(11);
    },

    mascararTelefone(telefone) {
        if (!telefone?.length) {
            return;
        }
        return telefone.substring(0, 2) + '*****' + telefone.substring(7);
    },

    mascararEMail(email) {
        if (!email?.length) {
            return;
        }
        let ret = email.substring(0, 2);
        const atIndex = email.indexOf('@');
        for (let i = 2; i < atIndex; i++) {
            ret += '*';
        }
        return ret + email.substring(atIndex);
    },

    mascararUuid(uuid) {
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
    },

    mascararNome(nome, caracteresVisiveisPrimeiroNome) {
        if (!nome?.length) {
            return;
        }

        if (nome.length > caracteresVisiveisPrimeiroNome) {
            return nome.substring(0, caracteresVisiveisPrimeiroNome) +
                nome.substring(caracteresVisiveisPrimeiroNome).replace(/\S/g, '*');
        }

        return nome.replace(/\S/g, '*');
    },
};
