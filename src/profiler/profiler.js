import {constants, stringUtils} from "../utils/index.js";
import {discordColors, discordService} from "../discord/index.js";

export const profiler = {
    requestThresholdMs: 1000, // Definido como uma propriedade fixa do objeto

    createProfiler(processName) {
        return {
            uuid: stringUtils.randomUUID(),
            processName,
            startTime: new Date(),
            steps: [],
            methodsCalled: [],
            hasSlowSteps: false, // Flag para indicar se algum step foi lento
            requestThresholdMs: profiler.requestThresholdMs,

            /**
             * Inicia um novo passo no profiler.
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

            registerCallMethod(stepName) {
                this.methodsCalled.push(stepName);
            },

            /**
             * Finaliza um passo e marca se precisar notificar no finishProcess.
             */
            finishStep(stepName) {
                const step = this.steps.find(s => s.stepName === stepName && !s.endTime);
                if (step) {
                    step.endTime = new Date();
                    step.durationMs = step.endTime.getTime() - step.startTime.getTime();

                    if (step.durationMs > step.stepThresholdMs) {
                        this.hasSlowSteps = true;
                    }
                }
            },

            /**
             * Obtém o threshold dinâmico com base na soma de todos os steps.
             */
            getDynamicThreshold() {
                const totalStepThreshold = this.steps.reduce((sum, step) => sum + step.stepThresholdMs, 0);
                return Math.max(this.requestThresholdMs, totalStepThreshold);
            },

            /**
             * Finaliza o profiler e verifica se precisa notificar o Discord.
             */
            finishProcess() {
                this.endTime = new Date();
                this.totalDurationMs = this.endTime.getTime() - this.startTime.getTime();

                const dynamicThreshold = this.getDynamicThreshold();

                if (this.totalDurationMs > dynamicThreshold || this.hasSlowSteps) {
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
                    methodsCalled: this.methodsCalled
                };
            },

            /**
             * Envia uma notificação ao Discord.
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
                    description += `\n**Limite Configurado:** ${this.getDynamicThreshold()}ms`;
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

                let color = discordColors.green;
                if (timeInMilis > 2 * this.getDynamicThreshold()) {
                    color = discordColors.red;
                } else if (timeInMilis > this.getDynamicThreshold()) {
                    color = discordColors.yellow;
                }

                return discordService.sendDiscord(
                    title,
                    description,
                    discordMessageEmbeds,
                    [constants.defaultAppProfilerAlertsWebhookUrl],
                    color
                ).catch(error => console.error("Erro ao enviar notificação ao Discord:", error));
            },

            /**
             * Método para editar o requestThresholdMs
             */
            setRequestThresholdMs(newThresholdMs) {
                this.requestThresholdMs = newThresholdMs;
            }
        };
    }
};