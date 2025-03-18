export const fetchService = {
    /**
     * Realiza uma requisição HTTP com tratamento de erros.
     * @param {string} url - URL da requisição.
     * @param {RequestInit} options - Configuração da requisição.
     * @returns {Promise<Object>} - Retorna um objeto com os metadados da requisição.
     */
    async safeFetch(url, options) {
        const responseData = {
            requestedUrl: url,
            ok: false,
            statusCode: null,
            rawResponse: null,
            responseBody: null,  // <= Novo campo para armazenar o corpo
            error: null,
        };

        try {
            const res = await fetch(url, options);
            responseData.ok = res.ok;
            responseData.statusCode = res.status;

            // Tenta extrair o body
            let bodyText;
            try {
                // Se for JSON, beleza; se não for, o catch interno pega e faz fallback
                bodyText = await res.clone().json();
            } catch {
                // Se não conseguir parsear como JSON, pega como texto
                bodyText = await res.clone().text();
            }

            responseData.responseBody = bodyText;
            responseData.rawResponse = res;

        } catch (err) {
            // Aqui é caso dê erro de conexão ou algo no 'fetch' em si
            responseData.error = err;
        }

        return responseData;
    }
};
