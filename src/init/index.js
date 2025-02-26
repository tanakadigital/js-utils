import {globals} from "../globals/index.js";
import {BadRequestError} from "../errors/index.js";

export const Init = {
    isInitialized: false,
    inititalizeJsUtils() {
        if (!this.isInitialized) {

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

            globals.values.appName = process.env.APP_NAME;
            globals.values.projectId = process.env.GCP_PROJECT_ID;

            globals.values.discordWebhookUrl = process.env.DISCORD_DEFAULT_WEBHOOK_URL;
            globals.values.discordAppErrorsWebhookUrl = process.env.DISCORD_APP_ERRORS_WEBHOOK_URL;


            this.isInitialized = true;

            return globals;
        }
    },
};

