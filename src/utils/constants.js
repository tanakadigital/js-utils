import dotenv from 'dotenv';

import {BadRequestError} from "../errors/index.js";

dotenv.config();

export const constants = {
    _isInitialized: false,

    appName: "Not found",
    projectId: process.env.GCP_PROJECT_ID || process.env.PROJECT_ID,
    defaultAppDiscordWebhookUrl: "https://discord.com/api/webhooks/1341162438187417681/rt23Yv3afC3ZpGw9LH5y0i8VVV_o0zwHeuRXRvAQIt1znFxwPTm1cDa8Rzczr4cwN6jj",
    defaultAppDiscordErrorsWebhookUrl: "https://discord.com/api/webhooks/1342627488466997330/J-kkv4lmnQVEYhWQtJ9sQafBxwiOTDOMopunWKlFui69hsexzY_ipW8yT5bcdaT5SCZ6",
    defaultAppDiscordCloudTaskErrorsWebhookUrl: "https://discord.com/api/webhooks/1345044619649617960/uGW4y7v2DQEsXYAJBGv0qoqMTycXzvq0im1o5QbUn33gR3dmvuJKkHj1Y27eb2cQqHd8",
    defaultAppProfilerAlertsWebhookUrl: "https://discord.com/api/webhooks/1346162138439356447/QH7fITLelZP7EFcJH-3JOASb_4Ej4lyLOn7q5iQnqlhaqxhZTvMB6wzwdPyogvtAxbwM",

    init() {
        if (!this._isInitialized) {
            if (!process.env.APP_NAME) {
                throw new BadRequestError("App name not found");
            }

            if (process.env.GCP_PROJECT_ID) {
                this.projectId = process.env.GCP_PROJECT_ID;
            } else if (process.env.PROJECT_ID) {
                this.projectId = process.env.PROJECT_ID;
            }

            if (process.env.DISCORD_DEFAULT_WEBHOOK_URL) {
                this.defaultAppDiscordWebhookUrl = process.env.DISCORD_DEFAULT_WEBHOOK_URL;
            }

            if (process.env.DISCORD_APP_ERRORS_WEBHOOK_URL) {
                this.defaultAppDiscordErrorsWebhookUrl = process.env.DISCORD_APP_ERRORS_WEBHOOK_URL;
            }

            if (process.env.DISCORD_APP_CLOUD_TASK_ERRORS_WEBHOOK_URL) {
                this.defaultAppDiscordCloudTaskErrorsWebhookUrl = process.env.DISCORD_APP_CLOUD_TASK_ERRORS_WEBHOOK_URL;
            }

            if (process.env.DISCORD_APP_PROFILER_ALERTS_WEBHOOK_URL) {
                this.defaultAppProfilerAlertsWebhookUrl = process.env.DISCORD_APP_PROFILER_ALERTS_WEBHOOK_URL;
            }


            this.appName = process.env.APP_NAME;

            this._isInitialized = true;
        }
    },
};