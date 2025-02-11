import {CustomError} from './custom.error.js';

/**
 * Erro 412 - Precondition Failed
 */
export class PreconditionFailedError extends CustomError {
    constructor(
        message = 'Precondition Failed',
        cause = null,
        userMessage = 'Os pré-requisitos para a requisição não foram atendidos.',
        internalMessage = 'Falha nas pré-condições da solicitação.',
        enableReportButton = false,
        ignoreSystemEvent = false,
        discordWebhookUrl = [],
    ) {
        const httpStatusCode = 412;

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
        this.name = 'PreconditionFailedError';
    }
}
