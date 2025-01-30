import { CustomError } from './custom.error.js';

/**
 * Erro 500 - Internal Server Error
 */
export class ServerError extends CustomError {
    constructor(
                    message = 'Internal Server Error',
                    cause = null,
                    userMessage = 'Ocorreu um erro interno no servidor.',
                    internalMessage = 'Erro inesperado durante o processamento da requisição.',
                    discordWebhookUrl = [],
                    enableReportButton = false,
    ) {
        const httpStatusCode = 500;

        super(
            message,
            cause,
            httpStatusCode,
            userMessage,
            internalMessage,
            enableReportButton,
            discordWebhookUrl
        );
        this.name = 'ServerError';
    }
}
