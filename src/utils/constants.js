import {envUtils} from "../env/index.js";

export const defaultAppDiscordWebhookUrl = "https://discord.com/api/webhooks/1341162438187417681/rt23Yv3afC3ZpGw9LH5y0i8VVV_o0zwHeuRXRvAQIt1znFxwPTm1cDa8Rzczr4cwN6jj";
export const defaultAppDiscordErrorsWebhookUrl = "https://discord.com/api/webhooks/1342627488466997330/J-kkv4lmnQVEYhWQtJ9sQafBxwiOTDOMopunWKlFui69hsexzY_ipW8yT5bcdaT5SCZ6";
export const defaultAppDiscordCloudTaskErrorsWebhookUrl = "https://discord.com/api/webhooks/1345044619649617960/uGW4y7v2DQEsXYAJBGv0qoqMTycXzvq0im1o5QbUn33gR3dmvuJKkHj1Y27eb2cQqHd8";
export const defaultAppProfilerAlertsWebhookUrl = "https://discord.com/api/webhooks/1346162138439356447/QH7fITLelZP7EFcJH-3JOASb_4Ej4lyLOn7q5iQnqlhaqxhZTvMB6wzwdPyogvtAxbwM";
export const defaultDiscordErrorsWebhookUrl = "https://discord.com/api/webhooks/1349736238466338948/ZUAJk5xH6hbmYwTyGgZqotSMVMnSZymEIGmMxP0pCssOv5Bdc60aXz4uYcrIPjFrK1vj";

export const appName = await envUtils.getEnvVariable("APP_NAME");
export const projectId = await envUtils.getEnvVariable("PROJECT_ID");
