import { constants, stringUtils } from "../utils/index.js";
import { discordColors, discordService } from "../discord/index.js";

export const profiler = {
    createProfiler(processName, requestThresholdMs = 1000) {
        return {
            uuid: stringUtils.randomUUID(),
            processName,
            startTime: new Date(),
            requestThresholdMs,
            steps: [],
            hasSlowSteps: false, // Flag para indicar se algum step foi lento

            /**
             * Inicia um novo passo no profiler.
             * @param {string} stepName - Nome do passo
             * @param {string} description - Descrição opcional do passo
             * @param {number|null} stepThresholdMs - Tempo mínimo antes de notificar (padrão: 50ms)
             */
            startStep(stepName, description = "", stepThresholdMs = 50) {
                this.steps.push({
                    stepName,
                    description,
                    startTime: new Date(),
                    endTime: null,
                    durationMs: null,
                    stepThresholdMs, // Tempo mínimo antes de notificar
                });
            },

            /**
             * Finaliza um passo e marca se precisar notificar no finishProcess.
             * @param {string} stepName - Nome do passo a ser finalizado
             */
            finishStep(stepName) {
                const step = this.steps.find(s => s.stepName === stepName && !s.endTime);
                if (step) {
                    step.endTime = new Date();
                    step.durationMs = step.endTime.getTime() - step.startTime.getTime();

                    // 🚨 Se o step foi lento, marcamos para notificação no finishProcess
                    if (step.durationMs > step.stepThresholdMs) {
                        this.hasSlowSteps = true;
                    }
                }
            },

            /**
             * Finaliza o profiler e verifica se precisa notificar o Discord.
             */
            finishProcess() {
                this.endTime = new Date();
                this.totalDurationMs = this.endTime.getTime() - this.startTime.getTime();

                // 🚨 Verificar se o processo ou algum step foi lento
                if (this.totalDurationMs > this.requestThresholdMs || this.hasSlowSteps) {
                    this.notifyDiscord(this.totalDurationMs, null, true)
                        .catch(error => console.error("Erro ao notificar Discord para requisição:", this.processName, error));
                }
            },

            getReport() {
                return {
                    uuid: this.uuid,
                    processName: this.processName,
                    totalDurationMs: this.totalDurationMs,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    steps: this.steps,
                };
            },

            /**
             * Envia uma notificação ao Discord.
             * @param {number} timeInMilis - Tempo de execução
             * @param {object|null} step - Step (se for notificação individual de step)
             * @param {boolean} isRequest - Se é para notificar a requisição inteira
             */
            async notifyDiscord(timeInMilis, step = null, isRequest = false) {
                const traceId = stringUtils.randomUUID();
                const title = isRequest
                    ? `⚠️ REQUISIÇÃO LENTA DETECTADA ⚠️`
                    : `⚠️ PROCESSO LENTO DETECTADO ⚠️`;

                let description = `
**App Name:** ${constants.appName}
**Processo:** ${this.processName}
**Duração:** ${timeInMilis}ms ⏳
**TraceId:** ${traceId}
**Data:** ${new Date().toISOString()}
`.trim();

                const discordMessageEmbeds = [];

                if (isRequest) {
                    description += `\n**Limite Configurado:** ${this.requestThresholdMs}ms`;

                    // Logando TODOS os steps da requisição
                    this.steps.forEach(s => {
                        discordMessageEmbeds.push({
                            title: `Step: ${s.stepName}`,
                            description: `Duração: ${s.durationMs}ms (Limite: ${s.stepThresholdMs}ms)`,
                            inline: false
                        });
                    });

                } else if (step) {
                    description += `\n**Passo:** ${step.stepName}`;
                    description += `\n**Limite Configurado:** ${step.stepThresholdMs}ms`;

                    discordMessageEmbeds.push({
                        title: `Step: ${step.stepName}`,
                        description: `Duração: ${step.durationMs}ms (Limite: ${step.stepThresholdMs}ms)`,
                        inline: false
                    });
                }

                // Definir cor com base no tempo
                let color = discordColors.green; // Rápido
                if (timeInMilis > 2 * this.requestThresholdMs) {
                    color = discordColors.red; // Muito lento
                } else if (timeInMilis > this.requestThresholdMs) {
                    color = discordColors.yellow; // Médio
                }

                return discordService.sendDiscord(
                    title,
                    description,
                    discordMessageEmbeds,
                    [constants.defaultAppProfilerAlertsWebhookUrl],
                    color
                ).catch(error => console.error("Erro ao enviar notificação ao Discord:", error));
            }
        };
    }
};
