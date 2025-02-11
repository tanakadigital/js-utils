import {CustomError} from './custom.error.js';

/**
 * Erro 405 - Method Not Allowed
 */
export class MethodNotAllowedError extends CustomError {
    constructor(
        message = 'Method Not Allowed',
        cause = null,
        userMessage = 'O método HTTP utilizado não é permitido.',
        internalMessage = 'Método HTTP não suportado para o endpoint.',
        enableReportButton = false,
        ignoreSystemEvent = false,
        discordWebhookUrl = [],
    ) {
        const httpStatusCode = 405;

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
        this.name = 'MethodNotAllowedError';
    }
}
