import {CustomError} from './custom.error.js';

/**
 * Erro 400 - Bad Request
 */
export class BadRequestError extends CustomError {
    constructor(
        message = 'Bad request',
        cause = null,
        userMessage = 'Bad request',
        internalMessage = 'Unknown bad request error',
        enableReportButton = false,
        ignoreSystemEvent = false,
        discordWebhookUrl = [],
    ) {

        const httpStatusCode = 400;

        super(
            message,
            cause,
            httpStatusCode,
            userMessage,
            internalMessage,
            enableReportButton,
            ignoreSystemEvent,
            discordWebhookUrl
        );
        this.name = 'BadRequestError';
    }
}
