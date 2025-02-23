import {globals} from "../globals/index.js";

export const Init = {
    isInitialized: false,
    inititalizeJsUtils(
        appName, projectId,
        discordWebhookUrl,
        discordAppErrorsWebhookUrl
    ) {
        if (!this.isInitialized) {

            globals.values.appName = appName;
            globals.values.projectId = projectId;

            globals.values.discordWebhookUrl = discordWebhookUrl;
            globals.values.discordAppErrorsWebhookUrl = discordAppErrorsWebhookUrl;

            this.isInitialized = true;

            return globals;
        }
    },
};

