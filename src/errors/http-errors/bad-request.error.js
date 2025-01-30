import {CustomError} from './custom.error.js';

/**
 * Erro 400 - Bad Request
 */
export class BadRequestError extends CustomError {
    constructor(
        appName,
        message = 'Bad request',
        cause = null,
        userMessage = 'Bad request',
        internalMessage = 'Unknown bad request error',
        discordWebhookUrl = [],
        enableReportButton = false,
    ) {

        const httpStatusCode = 400;

        super(
            appName,
            message,
            cause,
            httpStatusCode,
            userMessage,
            internalMessage,
            enableReportButton,
            discordWebhookUrl
        );
        this.name = 'BadRequestError';
    }
}
