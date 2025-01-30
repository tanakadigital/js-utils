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
        super({
            message,
            cause,
            httpStatusCode: 401,
            userMessage,
            internalMessage,
            enableReportButton,
            // se não vier nada, vira array vazio (não notifica)
            discordWebhookUrl: discordWebhookUrl || [],
        });
        this.name = 'UnauthorizedError';
    }
}
