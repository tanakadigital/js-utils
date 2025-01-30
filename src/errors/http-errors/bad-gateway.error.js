import {CustomError} from './custom.error.js';

/**
 * Erro 502 - Bad Gateway
 */
export class BadGatewayError extends CustomError {
    constructor(
        message = 'Bad Gateway',
        cause = null,
        userMessage = 'O servidor recebeu uma resposta inválida.',
        internalMessage = 'Erro ao tentar processar a resposta do servidor.',
        discordWebhookUrl = [],
        enableReportButton = false,
    ) {

        const httpStatusCode = 502;

        super(
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
