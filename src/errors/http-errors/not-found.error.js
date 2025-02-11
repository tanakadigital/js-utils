import {CustomError} from './custom.error.js';

/**
 * Erro 404 - Not Found
 */
export class NotFoundError extends CustomError {
    constructor(
        message = 'Not Found',
        cause = null,
        userMessage = 'O recurso solicitado não foi encontrado.',
        internalMessage = 'Tentativa de acessar um recurso inexistente.',
        enableReportButton = false,
        ignoreSystemEvent = false,
        discordWebhookUrl = [],
    ) {
        const httpStatusCode = 404;

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
        this.name = 'NotFoundError';
    }
}
