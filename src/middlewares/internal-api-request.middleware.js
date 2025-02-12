import {globals} from "../globals/index.js";
import {UnauthorizedError} from "../errors/index.js";


export const internalApiRequestMiddleware = {
    /**
     * Gera um traceUuid para cada requisição e anexa no objeto req.
     */
    async middleware(req, res, next) {
        if (!req) return;

        const appName = globals.getByName("appName");

        const apisKeysCollection = globals.getByName("apisKeysCollection");
        const apisRegistryCollection = globals.getByName("apisRegistryCollection");

        const apiRegistry = await apisRegistryCollection.findOne({
            appName: appName
        })

        if (!apiRegistry?.appName?.length) {
            throw new UnauthorizedError(
                "Api nao esta registrada",
                "Api nao esta registrada",
                "Api nao esta registrada",
                "Api nao esta registrada",
                false
            )
        }

        if (!apiRegistry?.isActive) {
            throw new UnauthorizedError(
                "Api nao esta ativa!",
                "Api nao esta ativa!",
                "Api nao esta ativa!",
                "Api nao esta ativa!",
            )
        }

        const foundedApiKey = await apisKeysCollection.findOne({
            appName: appName,
        })


        if (!foundedApiKey?.appName?.length) {
            throw new UnauthorizedError(
                "Api nao possui api-key ERRO CRITICO!!",
                "Api nao possui api-key ERRO CRITICO!!",
                "Api nao possui api-key ERRO CRITICO!!",
                "Api nao possui api-key ERRO CRITICO!!",
            )
        }

        const now = new Date();

        if (!foundedApiKey?.expiresAt || foundedApiKey.expiresAt.getTime() > now.getTime()) {
            throw new UnauthorizedError(
                "Api key esta expirada !!!",
                "Api key esta expirada !!!",
                "Api key esta expirada !!!",
                "Api key esta expirada !!!",
            )
        }

        next();
    }

}