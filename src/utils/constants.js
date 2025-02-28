import dotenv from 'dotenv';

import {BadRequestError} from "../errors/index.js";

dotenv.config();

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


export const appName = process.env.APP_NAME;
export const projectId = process.env.GCP_PROJECT_ID;

export const defaultAppDiscordWebhookUrl = "https://discord.com/api/webhooks/1342627488466997330/J-kkv4lmnQVEYhWQtJ9sQafBxwiOTDOMopunWKlFui69hsexzY_ipW8yT5bcdaT5SCZ6";
export const defaultAppDiscordErrorsWebhookUrl = process.env.DISCORD_DEFAULT_WEBHOOK_URL;
