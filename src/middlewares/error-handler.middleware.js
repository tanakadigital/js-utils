import {discordColors, sendDiscord} from '../discord/index.js';
import {StringUtils} from "../utils/index.js";

/**
 * Gera um traceUuid para cada requisição e anexa no objeto req.
 */
export const prepareRequest = async (req, res, next) => {
    if (!req) return;

    if (!req.traceUuid) {
        req.traceUuid = StringUtils.randomUUID();
        req.requestReceivedAt = new Date();
    }

    next();
}

/**
 * Middleware final de tratamento de erros.
 * Captura o erro, monta mensagem para Discord e envia.
 */
export const errorHandlerMiddleware = async (err, req, res, next) => {
    if (!req) return next();

    req.errorHandlingError = err;
    const traceId = req.traceUuid || StringUtils.randomUUID();

    const title = 'Error in RequestLoggingMiddlewareService.errorHandlerMiddleware';
    const description = `
**Method**: ${req.method}
**URL**: ${req.originalUrl}
**TraceId**: ${traceId}
`.trim();

    // Monta detalhes do erro
    const discordMessageEmbeds = [
        {
            title: 'Application Name',
            description: err.appName || 'No application name',
            inline: false,
        },
        {
            title: 'err.message',
            description: err.message || 'No error message',
            inline: false,
        },
        {
            title: 'err.stack',
            description: err.stack ? String(err.stack) : 'No stack trace',
            inline: false,
        },
    ];

    // Se o erro for de uma classe que herda de CustomError, ele pode ter `discordWebhookUrls`.
    // Caso não tenha ou seja vazio, não enviaremos nada.
    const channelUrls = Array.isArray(err.discordWebhookUrls)
        ? err.discordWebhookUrls
        : [];

    // Define status code e retorna userMessage de forma segura
    let httpStatusCode = err.httpStatusCode || 500;
    let userMessage = err.userMessage || `An unexpected error occurred. TraceId: ${traceId}`;

    // Exemplo de tratamento especial para uploads grandes, se for o caso
    // (basta remover caso não use).
    if (err.code === 'LIMIT_FILE_SIZE') {
        httpStatusCode = 413;
        userMessage = 'File size too large.';
    }

    // Adiciona info no embed
    discordMessageEmbeds.push({
        title: 'HTTP status code',
        description: String(httpStatusCode),
        inline: false,
    });
    discordMessageEmbeds.push({
        title: 'User message',
        description: userMessage,
        inline: false,
    });

    // Responde ao client
    res.status(httpStatusCode).send({
        code: httpStatusCode,
        message: userMessage,
    });

    // Log no servidor
    console.error(`Request error [TraceId: ${traceId}]:`, err);

    // Notifica no Discord APENAS se houver URLs
    if (channelUrls.length > 0) {
        try {
            await sendDiscord(
                title,
                description,
                discordMessageEmbeds,
                discordColors.red,
                channelUrls
            );
        } catch (notificationError) {
            console.error('Falha ao enviar notificação ao Discord:', notificationError);
        }
    }

    next();
}