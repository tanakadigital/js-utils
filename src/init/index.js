import {globals} from "../globals/index.js";

export const Init = {
    isInitialized: false,
    inititalizeJsUtils(
        appName, projectId,
        discordWebhookUrl
    ) {
        if (!this.isInitialized) {

            globals.values.appName = appName;
            globals.values.projectId = projectId;

            globals.values.discordWebhookUrl = discordWebhookUrl;

            this.isInitialized = true;
        }
    },
};

