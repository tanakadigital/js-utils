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
}
export const dicordService = {

    /**
     * Envia uma mensagem para um ou mais canais Discord via webhook.
     * @param {string} title
     * @param {string} shortDescription
     * @param {Array<{ title: string, description: string, inline?: boolean }>} [embedFields]
     * @param {number} [color] - Cor do embed.
     * @param {string[]} channelUrls - Lista obrigatória de Webhooks do Discord.
     */

    async sendDiscord(
        title,
        shortDescription,
        embedFields = [],
        color = 0x00ff00,
        channelUrls
    ) {
        if (!Array.isArray(channelUrls) || channelUrls.length === 0) {
            console.warn('DiscordHookService.sendDiscord chamado sem channelUrls. Nenhuma mensagem enviada.');
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
            color,
            fields: [],
        };

        if (Array.isArray(embedFields) && embedFields.length > 0) {
            embedFields.forEach((fieldItem) => {
                let inline = !!fieldItem.inline;
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

        // Envio para cada URL do webhook usando FetchService
        for (const channelUrl of channelUrls) {
            try {
                const response = await fetchService.safeFetch(channelUrl, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({embeds: [embed]}),
                });

                if (!response.ok) {
                    console.error(`Falha ao enviar webhook para: ${channelUrl}, Status: ${response.statusCode}`);
                }
            } catch (error) {
                console.error('Erro ao enviar notificação Discord:', error);
            }
        }
    }
}
