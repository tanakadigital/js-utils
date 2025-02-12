import {stringUtils} from "../utils/index.js";
import {Init} from "../init/index.js";
import {globals} from "../globals/index.js";


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

        if (Init.isInitialized) {
            req.appName = globals.getByName('appName');
        }

        next();
    }

};