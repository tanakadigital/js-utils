import {StringUtils} from "../utils/index.js";
import {Init} from "../init/index.js";
import {globals} from "../globals/index.js";


export const internalApiRequestMiddleware = {
    /**
     * Gera um traceUuid para cada requisição e anexa no objeto req.
     */
    async middleware(req, res, next) {
        if (!req) return;

        const appName = globals.getByName("appName");



        next();
    }

}