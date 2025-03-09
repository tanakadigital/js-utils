import {BadRequestError} from '../errors/index.js';
import {constants} from "../utils/index.js";
import {discordService} from "../discord/index.js";

export const cloudTaskUtils = {

    /**
     * Agenda uma tarefa no Google Cloud Tasks.
     *
     * Exemplo de uso esperado:
     *   await scheduleTask({
     *     parent: 'projects/SEU_PROJECT/locations/southamerica-east1/queues/SUA_FILA',
     *     httpRequest: {
     *       httpMethod: 'POST',
     *       url: 'https://url-que-sera-chamada',
     *       headers: {
     *         'Content-Type': 'application/json'
     *       },
     *       body: Buffer.from(JSON.stringify({ foo: 'bar' })).toString('base64')
     *     },
     *     scheduleTime: {
     *       seconds: Math.floor(Date.now() / 1000) + 60
     *     }
     *   });
     * @param {object} client - nome da fila no cloudtask.
     * @param {string} queueName - nome da fila no cloudtask.
     * @param {object} taskHttpRequest - Objeto que deve conter os dados necessários para a tarefa.
     * @param {object} scheduleTime - Objeto que deve conter os dados necessários para a tarefa.
     *   @property {string} task.parent - Caminho de projeto/fila, ex.: "projects/xxx/locations/xxx/queues/xxx".
     *   @property {object} task.httpRequest - Informações da requisição HTTP.
     *     @property {string} task.httpRequest.httpMethod - Método HTTP (ex.: "POST", "GET" etc.).
     *     @property {string} task.httpRequest.url - URL de destino.
     *     @property {object} task.httpRequest.headers - Cabeçalhos, deve incluir "Content-Type": "application/json".
     *     @property {string} [task.httpRequest.body] - Corpo da mensagem codificado em base64 (opcional).
     *   @property {object} [task.scheduleTime] - Opcional, se quiser agendamento futuro (ex.: { seconds: [timestamp futuro] }).
     *
     * @returns {Promise<object>} Resposta do CloudTasksClient.createTask().
     */

    async scheduleTask(client,
                       queueName,
                       taskHttpRequest = {
                           httpMethod: 'POST',
                           url: '',
                           headers: {
                               'Content-Type': 'application/json'
                           }
                       },
                       scheduleTime = {
                           seconds: Math.floor(Date.now() / 1000) + 1 // 1 segundo
                       }
    ) {
        try {
            if (!taskHttpRequest || typeof taskHttpRequest !== 'object') {
                throw new BadRequestError(
                    'A propriedade "task.httpRequest" é obrigatória e deve ser um objeto.'
                );
            }
            if (!taskHttpRequest.httpMethod) {
                throw new BadRequestError(
                    'httpRequest.httpMethod é obrigatório.'
                );
            }
            if (!taskHttpRequest.url) {
                throw new BadRequestError(
                    'httpRequest.url é obrigatório.'
                );
            }
            if (!taskHttpRequest.headers || typeof taskHttpRequest.headers !== 'object') {
                throw new BadRequestError(
                    'httpRequest.headers é obrigatório e deve ser um objeto.'
                );
            }
            if (taskHttpRequest.headers['Content-Type'] !== 'application/json') {
                throw new BadRequestError(
                    'Header "Content-Type" precisa ser "application/json".'
                );
            }

            const parent = `projects/${constants.projectId}/locations/southamerica-east1/queues/${queueName}`;

            const task = {
                httpRequest: taskHttpRequest,
                scheduleTime: scheduleTime
            };

            if (scheduleTime) {
                task.scheduleTime = scheduleTime;
            }

            const [response] = await client.createTask({
                parent,
                task: task
            });

            return response;
        } catch (e) {
            const embedFields = [
                {
                    title: "appName",
                    description: constants.appName,
                },
                {
                    title: "queueName",
                    description: queueName,
                },
                {
                    title: "taskHttpRequest",
                    description: JSON.stringify(taskHttpRequest),
                },
                {
                    title: "scheduleTime",
                    description: JSON.stringify(scheduleTime),
                }
            ];

            await discordService.sendApplicationDiscord(
                "Erro ao agendar tarefa no Cloud Tasks!!!",
                "Erro: " + e.message,
                embedFields,
                [
                    constants.defaultAppDiscordWebhookUrl,
                    constants.defaultAppDiscordCloudTaskErrorsWebhookUrl
                ]
            );

            throw e;
        }
    }
};
