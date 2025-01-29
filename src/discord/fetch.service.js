export const FetchService = {
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
            error: null,
        };

        try {
            const res = await fetch(url, options);
            responseData.ok = res.ok;
            responseData.statusCode = res.status;
            responseData.rawResponse = res;
        } catch (err) {
            responseData.error = err;
        }

        return responseData;
    },
};
