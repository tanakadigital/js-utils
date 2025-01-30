import {CustomError} from './custom.error.js';

/**
 * Erro 502 - Bad Gateway
 */
export class BadGatewayError extends CustomError {
    constructor(
        appName,
        message = 'Bad Gateway',
        cause = null,
        userMessage = 'O servidor recebeu uma resposta inválida.',
        internalMessage = 'Erro ao tentar processar a resposta do servidor.',
        discordWebhookUrl = [],
        enableReportButton = false,
    ) {

        const httpStatusCode = 502;

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
        this.name = 'BadGatewayError';
    }
}
