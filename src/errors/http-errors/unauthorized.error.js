import { CustomError } from './custom.error.js';

/**
 * Erro 401 - Unauthorized
 * Se quiser notificar um canal, passe `discordWebhookUrl` (string ou array).
 * Se não for passado, não notifica no Discord.
 */
export class UnauthorizedError extends CustomError {
    constructor(
                    message = 'Unauthorized',
                    cause = null,
                    userMessage = 'Unauthorized',
                    internalMessage = 'Unauthorized request',
                    enableReportButton = false,
                    discordWebhookUrl, // pode ser string ou array
    ) {
        const httpStatusCode = 401;

        super(
            message,
            cause,
            httpStatusCode,
            userMessage,
            internalMessage,
            enableReportButton,
            discordWebhookUrl
        );
        this.name = 'UnauthorizedError';
    }
}
