import {CustomError} from './custom.error.js';

/**
 * Erro genérico para REST APIs
 */
export class RestError extends CustomError {
    constructor(
        message = 'REST API Error',
        cause = null,
        httpStatusCode = 400,
        userMessage = 'Ocorreu um erro ao processar a requisição.',
        internalMessage = 'Erro genérico de API REST.',
        enableReportButton = false,
        ignoreSystemEvent = false,
        discordWebhookUrl = [],
    ) {
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
        this.name = 'RestError';
    }
}
