import { CustomError } from './custom.error.js';

/**
 * Erro 502 - Bad Gateway
 */
export class BadGatewayError extends CustomError {
    constructor({
                    message = 'Bad Gateway',
                    cause = null,
                    userMessage = 'O servidor recebeu uma resposta inválida.',
                    internalMessage = 'Erro ao tentar processar a resposta do servidor.',
                    discordWebhookUrl = [],
                    enableReportButton = false,
                } = {}) {
        super({
            message,
            cause,
            httpStatusCode: 502,
            userMessage,
            internalMessage,
            enableReportButton,
            discordWebhookUrl,
        });
        this.name = 'BadGatewayError';
    }
}
