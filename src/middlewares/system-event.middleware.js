import {stringUtils} from "../utils/index.js";
import {globals} from "../globals/index.js"; // Ajuste o caminho conforme necessário

export const systemEventMiddleware = {
    async middleware(req, res, next) {
        req.event = {
            eventName: 'event-name-missing',
            eventDescription: "Evento sem descrição",
            eventContent: {}
        };

        const requestInfo = {
            method: req.method,
            path: req.path,
            url: req.url,
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers,
            sourceApiUrl: req.url,
            systemEventUuid: stringUtils.randomUUID()
        };

        res.on('finish', () => {
            const appName = globals.getByName('appName');
            const isError = !!req.errorHandlingError;
            const ignoreErrorSystemEvents = req?.errorHandlingError?.ignoreSystemEvent || false;

            const asyncScheduleEventProcessorTask = globals.getByName('asyncScheduleEventProcessorTask');

            if (!ignoreErrorSystemEvents) {
                asyncScheduleEventProcessorTask(
                    requestInfo,
                    isError ? req.event.eventName.concat("-error") : req.event.eventName,
                    req.event.eventDescription,
                    req.event.eventContent,
                    req.errorHandlingError,
                    appName
                );
            }
        });
        next();
    }
};
