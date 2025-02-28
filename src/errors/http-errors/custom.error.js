import {constants} from "../../utils/index.js";

/**
 * Classe base para erros customizados.
 * - Subclasses podem sobrescrever httpStatusCode, userMessage, etc.
 * - Recebe um `discordWebhookUrl` (string ou array) para notificar no Discord (opcional).
 */
export class CustomError extends Error {
    discordWebhookUrls = [];

    constructor(
        message = 'Custom error',
        cause = null,
        httpStatusCode = 400,
        userMessage = 'Error',
        internalMessage = 'Unknown error',
        enableReportButton = false,
        ignoreSystemEvent = false,
        // Pode ser string ou array; se não vier, não notifica no Discord
        discordWebhookUrl = [],
    ) {
        super(message);
        this.name = this.constructor.name;

        this.appName = constants.appName;
        this.discordWebhookUrls.push(constants.defaultAppDiscordWebhookUrl);

        // Propriedades adicionais
        this.cause = cause;
        this.httpStatusCode = httpStatusCode;
        this.userMessage = userMessage;
        this.internalMessage = internalMessage;
        this.enableReportButton = enableReportButton;
        this.ignoreSystemEvent = ignoreSystemEvent;

        // Converte para array se for string única
        if (typeof discordWebhookUrl === 'string') {
            this.discordWebhookUrls.push(discordWebhookUrl);
        } else if (Array.isArray(discordWebhookUrl)) {

            for (const url of discordWebhookUrl) {
                this.discordWebhookUrls.push(url);
            }
        }
    }
}