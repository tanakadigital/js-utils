import {CustomError} from './custom.error.js';

/**
 * Erro 422 - Missing Client Forms
 */
export class MissingClientFormsError extends CustomError {
    constructor(
        appName,
        message = 'Missing Client Forms',
        cause = null,
        userMessage = 'Os formulários necessários não foram enviados.',
        internalMessage = 'Dados do cliente incompletos ou ausentes.',
        discordWebhookUrl = [],
        enableReportButton = false,
    ) {
        const httpStatusCode = 422;

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
        this.name = 'MissingClientFormsError';
    }
}
