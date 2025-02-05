import { CloudTasksClient } from '@google-cloud/tasks';
import { BadRequestError } from '../errors/http-errors/bad-request.error.js';

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
 *
 * @param {object} task - Objeto que deve conter os dados necessários para a tarefa.
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

export const scheduleTask = async (projectId, queueName, task) => {
    if (!task || typeof task !== 'object') {
        throw new BadRequestError(
            'cloud-task',
            'O parâmetro "task" é obrigatório e deve ser um objeto.'
        );
    }
    const { httpRequest, scheduleTime } = task;

    if (!httpRequest || typeof httpRequest !== 'object') {
        throw new BadRequestError(
            'cloud-task',
            'A propriedade "task.httpRequest" é obrigatória e deve ser um objeto.'
        );
    }
    if (!httpRequest.httpMethod) {
        throw new BadRequestError(
            'cloud-task',
            'httpRequest.httpMethod é obrigatório.'
        );
    }
    if (!httpRequest.url) {
        throw new BadRequestError(
            'cloud-task',
            'httpRequest.url é obrigatório.'
        );
    }
    if (!httpRequest.headers || typeof httpRequest.headers !== 'object') {
        throw new BadRequestError(
            'cloud-task',
            'httpRequest.headers é obrigatório e deve ser um objeto.'
        );
    }
    if (httpRequest.headers['Content-Type'] !== 'application/json') {
        throw new BadRequestError(
            'cloud-task',
            'Header "Content-Type" precisa ser "application/json".'
        );
    }

    if (scheduleTime) {
        task.scheduleTime = scheduleTime;
    }
    const parent = `projects/${projectId}/locations/southamerica-east1/queues/${queueName}`;

    const client = new CloudTasksClient();
    const [response] = await client.createTask({
        parent,
        task: task
    });

    return response;
};