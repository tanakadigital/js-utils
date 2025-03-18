import {constants} from "../utils/index.js";

import {fetchService} from "./fetch.service.js";

export const discordColors = {
    red: 0xff0000,
    green: 0x00ff00,
    yellow: 0xffff00,
    blue: 0x0000ff,
    purple: 0x800080,
    cyan: 0x00ffff,
    orange: 0xffa500,
    grey: 0x808080,
    black: 0x000000,
    white: 0xffffff,
    pink: 0xffc0cb,
    neon: 0x00ff00,
};

export const discordService = {
    /**
     * Envia uma mensagem para um ou mais canais do Discord via webhook, permitindo definir a cor.
     * @param {string} title
     * @param {string} shortDescription
     * @param {Array<{ title: string, description: string, inline?: boolean }>} [embedFields]
     * @param {string[]} channelUrls - Lista de Webhooks do Discord (obrigatório).
     * @param {number} [color=discordColors.grey] - Cor do embed no formato hexadecimal (ex: discordColors.red).
     */
    async sendDiscord(title, shortDescription, embedFields, channelUrls, color = discordColors.grey) {
        if (!Array.isArray(channelUrls) || channelUrls.length === 0) {
            console.warn("⚠️ DiscordService.sendDiscord chamado sem channelUrls. Nenhuma mensagem enviada.");
            return;
        }

        let titleLimited = title || "No title in Discord notification!";
        if (titleLimited.length > 256) {
            titleLimited = titleLimited.substring(0, 252) + "...";
        }

        let shortDescriptionLimited = shortDescription || "";
        if (shortDescriptionLimited.length > 2048) {
            shortDescriptionLimited = shortDescriptionLimited.substring(0, 2044) + "...";
        }

        const embed = {
            title: titleLimited,
            description: shortDescriptionLimited,
            color, // Cor agora sempre definida corretamente
            fields: [],
        };

        if (Array.isArray(embedFields) && embedFields.length > 0) {
            embedFields.forEach((fieldItem) => {
                let fieldTitle = fieldItem.title || "";
                if (fieldTitle.length > 256) {
                    fieldTitle = fieldTitle.substring(0, 252) + "...";
                }
                let fieldDescription = fieldItem.description || "";
                if (fieldDescription.length > 1024) {
                    fieldDescription = fieldDescription.substring(0, 1020) + "...";
                }
                embed.fields.push({
                    name: `**${fieldTitle}**`,
                    value: fieldDescription,
                    inline: !!fieldItem.inline,
                });
            });
        }

        for (const channelUrl of channelUrls) {
            let isError = false;
            fetchService
                .safeFetch(channelUrl, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({embeds: [embed]}),
                })
                .then((response) => {
                    if (!response.ok) {
                        isError = true;
                        console.error(`❌ Falha ao enviar webhook para: ${channelUrl}, Status: ${response.status}`);
                    }
                })
                .catch((error) => {
                    isError = true;
                    console.error("❌ Erro ao enviar notificação Discord:", error);
                })
                .finally(async () => {
                    if (isError) {

                        const errorEmbed = [
                            {
                                title: "Erro ao enviar notificação Discord",
                                description: `**Canal:** ${channelUrl}`,
                                fields: [
                                    {name: "Título", value: titleLimited},
                                    {name: "Descrição", value: shortDescriptionLimited},
                                    {name: "Cor", value: color.toString(16)},
                                    {name: "Embed Fields", value: JSON.stringify(embedFields)},
                                ]
                            }
                        ];

                        try {

                            const ret = await fetchService
                                .safeFetch(constants.defaultDiscordErrorsWebhookUrl, {
                                    method: "POST",
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify({embeds: [errorEmbed]}),
                                });

                            if (!ret?.ok) {
                                console.log("❌ Falha ao enviar notificação de erro Discord:", ret);
                            } else {
                                console.log("✅ Notificação de erro Discord enviada com sucesso:", ret);
                            }

                        } catch (e) {
                            console.error("❌ Erro ao enviar notificação de erro Discord:", e);
                        }
                    }
                });
        }
    },

    /**
     * Envia uma mensagem para um ou mais canais do Discord aplicando cores baseadas no ambiente.
     * @param {string} title
     * @param {string} shortDescription
     * @param {Array<{ title: string, description: string, inline?: boolean }>} [embedFields]
     * @param {string[]} [channelUrls=[constants.defaultAppDiscordWebhookUrl]] - Webhook de destino
     */
    async sendApplicationDiscord(title, shortDescription, embedFields, channelUrls = [constants.defaultAppDiscordWebhookUrl]) {
        let color = discordColors.red; // Produção (vermelho por padrão)

        if (process.env.NODE_ENV === "development") {
            color = discordColors.green;
        } else if (process.env.NODE_ENV === "staging") {
            color = discordColors.blue;
        }

        return this.sendDiscord(title, shortDescription, embedFields, channelUrls, color);
    },

    /**
     * Envia uma notificação ao Discord com cores baseadas no tempo de execução.
     * @param {string} title
     * @param {string} shortDescription
     * @param {Array<{ title: string, description: string, inline?: boolean }>} [embedFields]
     * @param {number} durationMs - Tempo de execução do processo.
     * @param {string[]} [channelUrls=[constants.defaultAppProfilerAlertsWebhookUrl]] - Webhook de destino.
     * @param {number} [customColor=null] - Cor customizada (se passar, ignora a lógica automática).
     */
    async sendProfilerDiscord(title, shortDescription, embedFields = [], durationMs, channelUrls = [constants.defaultAppProfilerAlertsWebhookUrl], customColor = null) {
        let color = customColor || discordColors.green; // Se não passar cor customizada, usa regra automática

        if (!customColor) { // Só aplica regras de cor se não foi passada uma cor customizada
            if (durationMs > 500 && durationMs <= 1000) {
                color = discordColors.yellow; // Médio = amarelo
            } else if (durationMs > 1000) {
                color = discordColors.red; // Lento = vermelho
            }
        }

        return this.sendDiscord(title, shortDescription, embedFields, channelUrls, color);
    }
};
