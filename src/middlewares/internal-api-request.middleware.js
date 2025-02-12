import {globals} from "../globals/index.js";
import {UnauthorizedError} from "../errors/index.js";


export const internalApiRequestMiddleware = {
    /**
     * Gera um traceUuid para cada requisição e anexa no objeto req.
     */
    async middleware(req, res, next) {
        if (!req) return;

        const appName = req.headers["x-app-name"];
        const xApiKey = req.headers["x-api-key"];

        if (!appName || !xApiKey) {
            throw new UnauthorizedError(
                "Headers inválidos",
                "Headers inválidos",
                "Headers inválidos",
                "Headers inválidos",
            );
        }

        const apisKeysCollection = globals.getByName("apisKeysCollection");
        const apisRegistryCollection = globals.getByName("apisRegistryCollection");

        const apiRegistry = await apisRegistryCollection.findOne({
            appName: appName,
        }, {
            projection: {
                _id: 0,
                appName: 1,
                isActive: 1,
            }
        });

        if (!apiRegistry?.appName?.length) {
            throw new UnauthorizedError(
                "Api nao esta registrada",
                "Api nao esta registrada",
                "Api nao esta registrada",
                "Api nao esta registrada",
                false
            );
        }

        if (!apiRegistry?.isActive) {
            throw new UnauthorizedError(
                "Api nao esta ativa!",
                "Api nao esta ativa!",
                "Api nao esta ativa!",
                "Api nao esta ativa!",
            );
        }

        const foundedApiKey = await apisKeysCollection.findOne({
            appName: appName,
            apiKey: xApiKey,
        });


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
                "Api key invalid",
                "Api key invalid",
                "Api key invalid",
                "Api key invalid",
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

        next();
    }

};