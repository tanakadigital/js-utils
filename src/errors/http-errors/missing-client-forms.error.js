import { CustomError } from './custom.error.js';

/**
 * Erro 422 - Missing Client Forms
 */
export class MissingClientFormsError extends CustomError {
    constructor({
                    message = 'Missing Client Forms',
                    cause = null,
                    userMessage = 'Os formulários necessários não foram enviados.',
                    internalMessage = 'Dados do cliente incompletos ou ausentes.',
                    discordWebhookUrl = [],
                    enableReportButton = false,
                } = {}) {
        super({
            message,
            cause,
            httpStatusCode: 422,
            userMessage,
            internalMessage,
            enableReportButton,
            discordWebhookUrl,
        });
        this.name = 'MissingClientFormsError';
    }
}
