import {globals} from "../globals/index.js";
import {UnauthorizedError} from "../errors/index.js";

export const internalApiAuthUtils = {
    /**
     * Verifica se a requisição é interna.
     * @param {RequestInit} optionsFetch
     * @returns {Promise<string[][]>}
     */
    async getHeaders(optionsFetch) {
        const appName = globals.getByName("appName");

        const apisKeysCollection = globals.getByName("apisKeysCollection");

        const foundedApiKeys = await apisKeysCollection.find(
            {
                appName: appName
            },
            {
                projection: {_id: 0, appName: 1, apiKey: 1, expiresAt: 1}, // Projeção
            })
            .sort({expiresAt: -1})
            .limit(1)
            .toArray();

        const [foundedApiKey] = foundedApiKeys;


        if (!foundedApiKey?.appName?.length) {
            throw new UnauthorizedError(
                "Api nao possui api-key ERRO CRITICO!!",
                "Api nao possui api-key ERRO CRITICO!!",
                "Api nao possui api-key ERRO CRITICO!!",
                "Api nao possui api-key ERRO CRITICO!!",
            );
        }

        if (!foundedApiKey?.apiKey?.length) {
            throw new UnauthorizedError(
                "Api nao possui api-key ERRO CRITICO!!",
                "Api nao possui api-key ERRO CRITICO!!",
                "Api nao possui api-key ERRO CRITICO!!",
                "Api nao possui api-key ERRO CRITICO!!",
            );

        }

        const now = new Date();

        if (!foundedApiKey?.expiresAt || foundedApiKey.expiresAt.getTime() < now.getTime()) {
            throw new UnauthorizedError(
                "Api key esta expirada !!!",
                "Api key esta expirada !!!",
                "Api key esta expirada !!!",
                "Api key esta expirada !!!",
            );
        }

        optionsFetch.headers['x-app-name'] = appName;
        optionsFetch.headers['x-api-key'] = foundedApiKey.apiKey;
    }
};