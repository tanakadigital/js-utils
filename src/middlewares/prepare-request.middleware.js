import {constants, stringUtils} from "../utils/index.js";


export const prepareRequest = {
    /**
     * Gera um traceUuid para cada requisição e anexa no objeto req.
     */
    async middleware(req, res, next) {
        if (!req) return;

        if (!req.traceUuid) {
            req.traceUuid = stringUtils.randomUUID();
            req.requestReceivedAt = new Date();
        }


        const requestInfo = {
            method: req.method,
            path: req.path,
            url: req.url,
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers,
            sourceApiUrl: req.url,
            systemEventUuid: stringUtils.randomUUID(),
            clientIp: req.clientIp
        };

        req.requestInfo = requestInfo;

        req.appName = constants.appName;

        next();
    }

};