import {CustomError} from './custom.error.js';

/**
 * Erro 403 - Forbidden
 */
export class ForbiddenError extends CustomError {
    constructor(
        appName,
        message = 'Forbidden',
        cause = null,
        userMessage = 'Você não tem permissão para acessar este recurso.',
        internalMessage = 'Tentativa de acesso a um recurso sem autorização.',
        discordWebhookUrl = [],
        enableReportButton = false,
    ) {
        const httpStatusCode = 403;

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
        this.name = 'ForbiddenError';
    }
}
