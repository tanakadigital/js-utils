import {CustomError} from './custom.error.js';

/**
 * Erro genérico para REST APIs
 */
export class RestError extends CustomError {
    constructor(
        appName,
        message = 'REST API Error',
        cause = null,
        httpStatusCode = 400,
        userMessage = 'Ocorreu um erro ao processar a requisição.',
        internalMessage = 'Erro genérico de API REST.',
        discordWebhookUrl = [],
        enableReportButton = false,
    ) {
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
        this.name = 'RestError';
    }
}
