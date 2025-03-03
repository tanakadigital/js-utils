import {constants} from "../utils/index.js";

import {fetchService} from './fetch.service.js';

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
     * Envia uma mensagem para um ou mais canais Discord via webhook, permitindo definir a cor.
     * @param {string} title
     * @param {string} shortDescription
     * @param {Array<{ title: string, description: string, inline?: boolean }>} [embedFields]
     * @param {string[]} channelUrls - Lista obrigatória de Webhooks do Discord.
     * @param {number} color - Cor do embed no formato hexadecimal (ex: discordColors.red).
     */
    async sendDiscord(title, shortDescription, embedFields = [], channelUrls, color) {
        if (!Array.isArray(channelUrls) || channelUrls.length === 0) {
            console.warn('DiscordService.sendDiscord chamado sem channelUrls. Nenhuma mensagem enviada.');
            return;
        }

        let titleLimited = title || 'No title in Discord notification!';
        if (titleLimited.length > 256) {
            titleLimited = titleLimited.substring(0, 252) + '...';
        }

        let shortDescriptionLimited = shortDescription || '';
        if (shortDescriptionLimited.length > 2048) {
            shortDescriptionLimited = shortDescriptionLimited.substring(0, 2044) + '...';
        }

        const embed = {
            title: titleLimited,
            description: shortDescriptionLimited,
            color: color || discordColors.grey, // Se não for passada cor, usa cinza
            fields: [],
        };

        if (Array.isArray(embedFields) && embedFields.length > 0) {
            embedFields.forEach((fieldItem) => {
                const inline = !!fieldItem.inline;
                let fieldTitle = fieldItem.title || '';
                if (fieldTitle.length > 256) {
                    fieldTitle = fieldTitle.substring(0, 252) + '...';
                }
                let fieldDescription = fieldItem.description || '';
                if (fieldDescription.length > 1024) {
                    fieldDescription = fieldDescription.substring(0, 1020) + '...';
                }
                embed.fields.push({
                    name: `**${fieldTitle}**`,
                    value: fieldDescription,
                    inline,
                });
            });
        }

        for (const channelUrl of channelUrls) {
            try {
                const response = await fetchService.safeFetch(channelUrl, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({embeds: [embed]}),
                });

                if (!response.ok) {
                    console.error(`Falha ao enviar webhook para: ${channelUrl}, Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Erro ao enviar notificação Discord:', error);
            }
        }
    },

    /**
     * Envia uma mensagem para um ou mais canais do Discord aplicando cores baseadas no ambiente.
     * @param {string} title
     * @param {string} shortDescription
     * @param {Array<{ title: string, description: string, inline?: boolean }>} [embedFields]
     * @param {string[]} channelUrls
     */
    async sendApplicationDiscord(title, shortDescription,
                                 embedFields = [], channelUrls=[constants.defaultAppDiscordWebhookUrl]) {
        let color = discordColors.red; // Produção (vermelho por padrão)

        if (process.env.NODE_ENV === 'development') {
            color = discordColors.green;
        } else if (process.env.NODE_ENV === 'staging') {
            color = discordColors.blue;
        }

        await this.sendDiscord(title, shortDescription, embedFields, channelUrls, color);
    },

    /**
     * Envia uma notificação ao Discord com cores baseadas no tempo de execução.
     * @param {string} title
     * @param {string} shortDescription
     * @param {Array<{ title: string, description: string, inline?: boolean }>} [embedFields]
     * @param {string[]} channelUrls
     * @param {number} durationMs - Tempo de execução do processo.
     */
    async sendProfilerDiscord(title, shortDescription, embedFields = [],
                              durationMs, channelUrls = [constants.defaultAppProfilerAlertsWebhookUrl]) {
        let color = discordColors.green; // Rápido = verde

        if (durationMs > 500 && durationMs <= 1000) {
            color = discordColors.yellow; // Médio = amarelo
        } else if (durationMs > 1000) {
            color = discordColors.red; // Lento = vermelho
        }

        await this.sendDiscord(title, shortDescription, embedFields, channelUrls, color);
    }
};
