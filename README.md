1. Visão Geral
   js‑utils é uma biblioteca utilitária desenvolvida pela Tanaka Digital que fornece funções e classes para:
   Tratamento de erros: Classes customizadas para erros HTTP (400, 401, 403, 404, 405, 408, 412, 422, 500, 502, etc.);
   Integração com o Discord: Envio de mensagens via webhook (com funções para formatação de embeds e cores pré-definidas);
   Manipulação de ambiente: Leitura e cache de variáveis de ambiente (inclusive com integração com o Secret Manager do Google Cloud em produção);
   Middlewares para Express: Middlewares para gerar identificadores únicos de requisição e tratar erros de forma centralizada;
   Funções utilitárias gerais: Funções para manipulação de datas, strings, números e CPF (geração, validação e formatação).
   A lib foi projetada para aplicações Node.js que utilizam módulos ES e possui integração com outros serviços (Cloud Tasks, Discord, etc.).

2. Instalação
   Utilize o npm para instalar a biblioteca:
   bash
   Copiar
   npm install @tanakadigital/js-utils


3. Estrutura de Diretórios
   A estrutura de pastas do projeto é a seguinte:
   pgsql
   Copiar
   js-utils/
   ├── .eslintrc.js
   ├── index.js
   ├── package.json
   ├── README.md
   └── src/
   ├── index.js
   ├── cloud-task/
   │   ├── cloud-task.utils.js
   │   └── index.js
   ├── discord/
   │   ├── discord-hook.service.js
   │   ├── fetch.service.js
   │   └── index.js
   ├── env/
   │   ├── env-utils.js
   │   └── index.js
   ├── errors/
   │   ├── index.js
   │   └── http-errors/
   │       ├── bad-gateway.error.js
   │       ├── bad-request.error.js
   │       ├── custom.error.js
   │       ├── forbidden.error.js
   │       ├── index.js
   │       ├── method-not-allowed.error.js
   │       ├── missing-client-forms.error.js
   │       ├── not-found.error.js
   │       ├── precondition-failed.error.js
   │       ├── request-timeout.error.js
   │       ├── rest.error.js
   │       ├── server.error.js
   │       └── unauthorized.error.js
   ├── globals/
   │   └── index.js
   ├── init/
   │   └── index.js
   ├── middlewares/
   │   ├── error-handler.middleware.js
   │   ├── index.js
   │   └── prepare-request.middleware.js
   └── utils/
   ├── cpf-utils.js
   ├── date-utils.js
   ├── index.js
   ├── mask-utils.js
   ├── number-utils.js
   └── string-utils.js


4. Detalhamento dos Módulos e Arquivos
   4.1 Arquivos Raiz
   .eslintrc.js
   Local: Raiz
   Descrição: Configuração do ESLint para o projeto (Node.js, ES2022).
   Exemplo de Conteúdo:
   js
   Copiar
   module.exports = {
   root: true,
   env: {
   node: true,
   es2022: true,
   },
   extends: [
   'eslint:recommended',
   ],
   parserOptions: {
   ecmaVersion: 'latest',
   sourceType: 'module',
   }
   };


index.js (raiz)
Local: Raiz
Descrição: Ponto de entrada da lib que reexporta todos os módulos do diretório src.
js
Copiar
export * from "./src/index.js";


package.json
Local: Raiz
Descrição: Define os metadados, dependências, scripts e configurações de publicação da lib.
Observação: Veja os campos “name”, “version”, “exports” e os scripts de linting e versionamento.
README.md
Local: Raiz
Descrição: Arquivo com a descrição resumida da biblioteca (pode ser expandido com instruções de uso, exemplos e links).

4.2 Módulo src
4.2.1 Índice Geral
src/index.js
Descrição: Agrega as exportações dos módulos: errors, discord, middlewares, utils, env, cloud-task e globals.
js
Copiar
export * from './errors/index.js';
export * from './discord/index.js';
export * from './middlewares/index.js';
export * from './utils/index.js';
export * from './env/index.js';
export * from './cloud-task/index.js';
export * from './globals/index.js';



4.2.2 Cloud Task
cloud-task/cloud-task.utils.js
Descrição: Função utilitária para agendar tarefas via Google Cloud Tasks.
Função Principal:
scheduleTask(projectId, queueName, task)
Parâmetros:
projectId (string): ID do projeto no Google Cloud.
queueName (string): Nome da fila a ser utilizada.
task (object): Objeto contendo os dados da tarefa (obrigatório possuir a propriedade httpRequest com método, URL, headers e body).
Validações:
Verifica se task é um objeto;
Verifica se httpRequest contém os atributos obrigatórios e se o header "Content-Type" é "application/json".
Exemplo de Uso:
js
Copiar
import { scheduleTask } from '@tanakadigital/js-utils/cloud-task';

const task = {
httpRequest: {
httpMethod: 'POST',
url: 'https://example.com/api/task',
headers: { 'Content-Type': 'application/json' },
body: Buffer.from(JSON.stringify({ foo: 'bar' })).toString('base64')
},
scheduleTime: { seconds: Math.floor(Date.now() / 1000) + 60 }
};

scheduleTask('meu-project-id', 'minha-fila', task)
.then(response => console.log('Tarefa agendada:', response))
.catch(err => console.error('Erro ao agendar tarefa:', err));


cloud-task/index.js
Descrição: Reexporta a função scheduleTask para facilitar a importação.

4.2.3 Discord
discord/discord-hook.service.js
Descrição: Serviço para enviar mensagens para canais do Discord utilizando webhooks.
Principais Exportações:
sendDiscord(title, shortDescription, embedFields, color, channelUrls)
Envia uma mensagem com embed para uma lista de URLs (webhooks) do Discord.
Realiza truncamento dos textos se excederem os limites do Discord.
discordColors
Objeto com cores pré-definidas para uso em embeds.
discord/fetch.service.js
Descrição: Implementa a função safeFetch para realizar requisições HTTP com tratamento de erros.
Função Principal:
safeFetch(url, options)
Retorna um objeto contendo propriedades como ok, statusCode, rawResponse e error.
discord/index.js
Descrição: Reexporta os métodos do módulo Discord.

4.2.4 Ambiente (env)
env/env-utils.js
Descrição: Funções para acesso a variáveis de ambiente com suporte a cache e ao Secret Manager do Google Cloud em ambiente de produção.
Função Principal:
envUtils.getEnvVariable(variableName, throwsOnEmpty)
Busca a variável no process.env em desenvolvimento ou via Secret Manager em produção;
Armazena em cache o resultado.
env/index.js
Descrição: Reexporta o objeto envUtils.

4.2.5 Erros
errors/index.js
Descrição: Agrega a exportação das classes de erros (HTTP errors) presentes na subpasta http-errors.
errors/http-errors/
Descrição: Contém classes que estendem a classe base CustomError para representar erros HTTP específicos.
Principais Arquivos e suas Funções:
bad-request.error.js (400):
Representa erro de Bad Request.
Exemplo de Uso:
js
Copiar
import { BadRequestError } from '@tanakadigital/js-utils/errors';
throw new BadRequestError('Dados de entrada inválidos.');


unauthorized.error.js (401):
Erro de autorização.
forbidden.error.js (403):
Erro para acesso negado.
not-found.error.js (404):
Erro para recurso não encontrado.
method-not-allowed.error.js (405):
Indica método HTTP não permitido.
request-timeout.error.js (408):
Indica tempo limite excedido.
precondition-failed.error.js (412):
Indica falha em pré-condições.
missing-client-forms.error.js (422):
Erro para dados incompletos ou ausentes.
server.error.js (500):
Erro interno do servidor.
bad-gateway.error.js (502):
Erro de Bad Gateway.
rest.error.js:
Erro genérico para APIs REST.
custom.error.js:
Classe base para todos os erros customizados. Possui parâmetros para mensagem, causa, status HTTP, mensagens para o usuário, mensagens internas e URLs para notificação no Discord.
errors/http-errors/index.js
Descrição: Reexporta todas as classes de erro para uso centralizado.

4.2.6 Globals e Init
globals/index.js
Descrição: Permite definir e acessar variáveis globais da aplicação, como appName e projectId, que são definidas durante a inicialização.
init/index.js
Descrição: Responsável por inicializar a lib.
Função Principal:
Init.inititalizeJsUtils(appName, admin, projectId)
Define variáveis globais e garante que a inicialização ocorra apenas uma vez.
Exemplo de Uso:
js
Copiar
import { Init } from '@tanakadigital/js-utils/init';
Init.inititalizeJsUtils('MeuApp', instanciaAdmin, 'meu-project-id');



4.2.7 Middlewares
middlewares/prepare-request.middleware.js
Descrição: Middleware para Express que gera um identificador único (traceUuid) para cada requisição e anexa outras informações (como requestReceivedAt e appName).
middlewares/error-handler.middleware.js
Descrição: Middleware para tratamento de erros em requisições Express.
Funcionalidades:
Loga os erros com um traceUuid;
Envia resposta com um código HTTP apropriado e uma mensagem amigável para o usuário;
Opcionalmente, envia notificações para canais do Discord se a classe de erro possuir URLs configuradas.
middlewares/index.js
Descrição: Agrega as exportações dos middlewares (prepareRequest e errorHandler).

4.2.8 Utils
A pasta utils contém funções auxiliares para diversas tarefas:
cpf-utils.js
Descrição:
generate(formatted): Gera um CPF válido (formata se solicitado);
isValid(value): Valida um CPF;
format(value): Formata um CPF para o padrão ###.###.###-##.
date-utils.js
Descrição: Utiliza a biblioteca dayjs para:
Converter segundos para milissegundos/dias/horas/minutos;
Adicionar intervalos de tempo a uma data;
Formatar datas em diversos padrões;
Calcular a idade ou o número de parcelas pagas com base em datas.
mask-utils.js
Descrição: Funções para mascarar dados sensíveis, como CPF, telefones, e-mails e matrículas.
number-utils.js
Descrição: Funções para conversão de strings para números, arredondamento, formatação de valores monetários, entre outras.
string-utils.js
Descrição:
randomUUID(): Gera um UUID (utilizando a biblioteca uuid);
Funções para remover acentos, extrair apenas números de uma string, ajustar formato de telefones e demais operações com strings.
utils/index.js
Descrição: Agrega e reexporta todos os módulos utilitários.

5. Exemplos de Uso
   A seguir, um exemplo que demonstra como utilizar algumas funcionalidades da lib:
   js
   Copiar
   import { randomUUID } from '@tanakadigital/js-utils/utils/string-utils';
   import { BadRequestError } from '@tanakadigital/js-utils/errors';
   import { scheduleTask } from '@tanakadigital/js-utils/cloud-task';
   import { envUtils } from '@tanakadigital/js-utils/env';

(async () => {
try {
// Gerando um UUID
const uuid = randomUUID();
console.log('UUID gerado:', uuid);

    // Obtendo uma variável de ambiente
    const apiKey = await envUtils.getEnvVariable('API_KEY');
    console.log('API Key:', apiKey);

    // Agendando uma tarefa via Cloud Tasks
    const taskResponse = await scheduleTask('meu-project-id', 'minha-fila', {
      httpRequest: {
        httpMethod: 'POST',
        url: 'https://example.com/endpoint',
        headers: { 'Content-Type': 'application/json' },
        body: Buffer.from(JSON.stringify({ id: uuid })).toString('base64')
      },
      scheduleTime: { seconds: Math.floor(Date.now() / 1000) + 120 }
    });
    console.log('Tarefa agendada:', taskResponse);

} catch (err) {
console.error('Ocorreu um erro:', err);
throw new BadRequestError('Erro durante o processamento.', err);
}
})();


6. Contribuição e Fluxo de Trabalho
   Linting:
   Utilize o comando npm run lint para garantir que o código esteja conforme as regras definidas no .eslintrc.js.
   Versionamento:
   Utilize os scripts patch, minor ou major (ex.: npm run patch) para atualizar a versão da lib conforme as alterações realizadas.
   Publicação:
   O comando npm run publish realiza a publicação da lib no npm com acesso público.

7. Licença
   Este projeto está licenciado sob os termos definidos pela Tanaka Digital.

8. Considerações Finais
   Esta documentação cobre os pontos principais da js‑utils. Para maiores detalhes, recomenda-se consultar os comentários e exemplos contidos nos próprios arquivos fonte.
   Observação:
   A documentação da lib js‑firebase-auth será elaborada em seguida, seguindo uma abordagem semelhante.

