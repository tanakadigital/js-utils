import dotenv from 'dotenv';

import {BadRequestError} from "../errors/index.js";

dotenv.config();

export const constants = {
    _isInitialized: false,

    appName: "Not found",
    projectId: process.env.GCP_PROJECT_ID,
    defaultAppDiscordWebhookUrl: "https://discord.com/api/webhooks/1341162438187417681/rt23Yv3afC3ZpGw9LH5y0i8VVV_o0zwHeuRXRvAQIt1znFxwPTm1cDa8Rzczr4cwN6jj",
    defaultAppDiscordErrorsWebhookUrl: "https://discord.com/api/webhooks/1342627488466997330/J-kkv4lmnQVEYhWQtJ9sQafBxwiOTDOMopunWKlFui69hsexzY_ipW8yT5bcdaT5SCZ6",

    init() {
        if (!this._isInitialized) {
            if (!process.env.APP_NAME) {
                throw new BadRequestError("App name not found");
            }

            if (!process.env.GCP_PROJECT_ID) {
                throw new BadRequestError("GCP Project ID not found");
            }

            if (!process.env.DISCORD_DEFAULT_WEBHOOK_URL) {
                throw new BadRequestError("Discord default webhook URL not found");
            }

            if (!process.env.DISCORD_APP_ERRORS_WEBHOOK_URL) {
                throw new BadRequestError("Discord app errors webhook URL not found");
            }


            this.appName = process.env.APP_NAME;
            this.projectId = process.env.GCP_PROJECT_ID;

            this.defaultAppDiscordWebhookUrl = process.env.DISCORD_DEFAULT_WEBHOOK_URL;

            this._isInitialized = true;
        }
    },
};