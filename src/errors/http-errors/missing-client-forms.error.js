import {CustomError} from './custom.error.js';

/**
 * Erro 422 - Missing Client Forms
 */
export class MissingClientFormsError extends CustomError {
    constructor(
        message = 'Missing Client Forms',
        cause = null,
        userMessage = 'Os formulários necessários não foram enviados.',
        internalMessage = 'Dados do cliente incompletos ou ausentes.',
        enableReportButton = false,
        ignoreSystemEvent = false,
        discordWebhookUrl = [],
    ) {
        const httpStatusCode = 422;

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
        this.name = 'MissingClientFormsError';
    }
}
