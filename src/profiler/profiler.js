import {constants, stringUtils} from "../utils";
import {discordService} from "../discord/index.js";

export const profiler = {
    createProfiler(processName) {
        return {
            uuid: stringUtils.randomUUID(),
            processName,
            startTime: new Date(),
            steps: [],
            startStep(stepName, description = "") {
                this.steps.push({
                    stepName,
                    description,
                    startTime: new Date(),
                    endTime: null,
                    durationMs: null
                });
            },
            endStep(stepName) {
                const step = this.steps.find(s => s.stepName === stepName && !s.endTime);
                if (step) {
                    step.endTime = new Date();
                    step.durationMs = step.endTime.getTime() - step.startTime.getTime();

                    // 🚨 Se um passo demorou mais de 500ms, enviamos alerta no Discord
                    if (step.durationMs > 500) {
                        this.notifyDiscord(step.durationMs, step);
                    }
                }
            },
            finish() {
                this.endTime = new Date();
                this.totalDurationMs = this.endTime.getTime() - this.startTime.getTime();
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
            async notifyDiscord(timeInMilis, step) {  // Agora recebe timeInMilis como parâmetro
                try {
                    const traceId = stringUtils.randomUUID();
                    const title = `⚠️ ALTA LATÊNCIA DETECTADA ⚠️`;
                    const description = `
**Processo:** ${this.processName}
**Passo:** ${step.stepName}
**Duração:** ${timeInMilis}ms ⏳
**TraceId:** ${traceId}
**Data:** ${new Date().toISOString()}
`.trim();

                    const discordMessageEmbeds = [
                        {
                            title: 'App Name',
                            description: constants.appName,
                            inline: false,
                        },
                        {
                            title: 'Processo',
                            description: this.processName,
                            inline: false,
                        },
                        {
                            title: 'Passo',
                            description: step.stepName,
                            inline: false,
                        },
                        {
                            title: 'Duração (ms)',
                            description: `${timeInMilis}`,
                            inline: false,
                        },
                        {
                            title: 'Data/Hora',
                            description: new Date().toISOString(),
                            inline: false,
                        }
                    ];

                    await discordService.sendProfilerDiscord(
                        title,
                        description,
                        discordMessageEmbeds,
                        timeInMilis
                    );
                } catch (error) {
                    console.error("Erro ao enviar notificação para o Discord:", error);
                }
            }
        };
    }
};
