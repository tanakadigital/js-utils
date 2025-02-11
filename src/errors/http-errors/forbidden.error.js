import {CustomError} from './custom.error.js';

/**
 * Erro 403 - Forbidden
 */
export class ForbiddenError extends CustomError {
    constructor(
        message = 'Forbidden',
        cause = null,
        userMessage = 'Você não tem permissão para acessar este recurso.',
        internalMessage = 'Tentativa de acesso a um recurso sem autorização.',
        enableReportButton = false,
        ignoreSystemEvent = false,
        discordWebhookUrl = [],
    ) {
        const httpStatusCode = 403;

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
        this.name = 'ForbiddenError';
    }
}
