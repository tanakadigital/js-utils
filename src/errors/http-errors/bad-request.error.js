import { CustomError } from './custom.error.js';

/**
 * Erro 400 - Bad Request
 */
export class BadRequestError extends CustomError {
    constructor({
                    message = 'Bad request',
                    cause = null,
                    userMessage = 'Bad request',
                    internalMessage = 'Unknown bad request error',
                    discordWebhookUrl = [],
                    enableReportButton = false,
                } = {}) {
        super({
            message,
            cause,
            httpStatusCode: 400,
            userMessage,
            internalMessage,
            enableReportButton,
            discordWebhookUrl,
        });
        this.name = 'BadRequestError';
    }
}
