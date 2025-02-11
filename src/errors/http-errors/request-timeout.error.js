import {CustomError} from './custom.error.js';

/**
 * Erro 408 - Request Timeout
 */
export class RequestTimeoutError extends CustomError {
    constructor(
        message = 'Request Timeout',
        cause = null,
        userMessage = 'O tempo limite da solicitação foi excedido.',
        internalMessage = 'A requisição demorou mais do que o permitido.',
        enableReportButton = false,
        ignoreSystemEvent = false,
        discordWebhookUrl = [],
    ) {
        const httpStatusCode = 408;

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
        this.name = 'RequestTimeoutError';
    }
}
