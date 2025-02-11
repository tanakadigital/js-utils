import {globals} from "../../globals/index.js";
import {Init} from "../../init/index.js";

/**
 * Classe base para erros customizados.
 * - Subclasses podem sobrescrever httpStatusCode, userMessage, etc.
 * - Recebe um `discordWebhookUrl` (string ou array) para notificar no Discord (opcional).
 */
export class CustomError extends Error {
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

        this.appName = Init.isInitialized ? globals.getByName("appName") : "custom-error";
        // Propriedades adicionais
        this.cause = cause;
        this.httpStatusCode = httpStatusCode;
        this.userMessage = userMessage;
        this.internalMessage = internalMessage;
        this.enableReportButton = enableReportButton;
        this.ignoreSystemEvent = ignoreSystemEvent

        // Converte para array se for string única
        if (typeof discordWebhookUrl === 'string') {
            this.discordWebhookUrls = [discordWebhookUrl];
        } else if (Array.isArray(discordWebhookUrl)) {
            this.discordWebhookUrls = discordWebhookUrl;
        } else {
            this.discordWebhookUrls = [];
        }
    }
}


/**
 * Classe base para erros customizados.
 * - Subclasses podem sobrescrever httpStatusCode, userMessage, etc.
 * - Recebe um `discordWebhookUrl` (string ou array) para notificar no Discord (opcional).
 */
export class CustomErrorAppName extends Error {
    constructor(
        appName,
        message = 'Custom error',
        cause = null,
        httpStatusCode = 400,
        userMessage = 'Error',
        internalMessage = 'Unknown error',
        enableReportButton = false,
        // Pode ser string ou array; se não vier, não notifica no Discord
        discordWebhookUrl = [],
    ) {
        super(message);
        this.name = this.constructor.name;

        this.appName = appName
        // Propriedades adicionais
        this.cause = cause;
        this.httpStatusCode = httpStatusCode;
        this.userMessage = userMessage;
        this.internalMessage = internalMessage;
        this.enableReportButton = enableReportButton;

        // Converte para array se for string única
        if (typeof discordWebhookUrl === 'string') {
            this.discordWebhookUrls = [discordWebhookUrl];
        } else if (Array.isArray(discordWebhookUrl)) {
            this.discordWebhookUrls = discordWebhookUrl;
        } else {
            this.discordWebhookUrls = [];
        }
    }
}
