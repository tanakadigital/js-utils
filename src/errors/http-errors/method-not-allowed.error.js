import { CustomError } from './custom.error.js';

/**
 * Erro 405 - Method Not Allowed
 */
export class MethodNotAllowedError extends CustomError {
    constructor({
                    message = 'Method Not Allowed',
                    cause = null,
                    userMessage = 'O método HTTP utilizado não é permitido.',
                    internalMessage = 'Método HTTP não suportado para o endpoint.',
                    discordWebhookUrl = [],
                    enableReportButton = false,
                } = {}) {
        super({
            message,
            cause,
            httpStatusCode: 405,
            userMessage,
            internalMessage,
            enableReportButton,
            discordWebhookUrl,
        });
        this.name = 'MethodNotAllowedError';
    }
}
