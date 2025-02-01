// src/env-utils/index.js
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

// Carrega as variáveis do .env (útil para desenvolvimento)
dotenv.config();

export class EnvUtils {
    /**
     * Construtor que inicializa o Secret Manager e extrai o projectId
     * a partir do arquivo definido na variável GOOGLE_APPLICATION_CREDENTIALS.
     */
    constructor() {
        // Obtém o caminho do arquivo de credenciais do Google
        const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        if (!credentialsPath) {
            throw new Error('GOOGLE_APPLICATION_CREDENTIALS não está definido.');
        }

        // Resolve o caminho absoluto (caso necessário)
        const absolutePath = path.isAbsolute(credentialsPath)
            ? credentialsPath
            : path.join(process.cwd(), credentialsPath);

        // Lê e parseia o arquivo de credenciais JSON
        let credentials;
        try {
            const fileContent = fs.readFileSync(absolutePath, 'utf8');
            credentials = JSON.parse(fileContent);
        } catch (error) {
            throw new Error(`Erro ao ler as credenciais em ${absolutePath}: ${error.message}`);
        }

        // Extrai o project_id do arquivo de credenciais
        this.projectId = credentials.project_id;
        if (!this.projectId) {
            throw new Error('project_id não encontrado nas credenciais.');
        }

        // Inicializa o Secret Manager
        this.secretManagerClient = new SecretManagerServiceClient();
    }

    /**
     * Acessa o Secret Manager para obter o valor do segredo especificado.
     * @param {string} secretName - Nome do segredo a ser buscado.
     * @returns {Promise<string|null>} - Valor do segredo ou null em caso de erro.
     */
    async accessSecret(secretName) {
        try {
            const [version] = await this.secretManagerClient.accessSecretVersion({
                name: `projects/${this.projectId}/secrets/${secretName}/versions/latest`
            });
            return version.payload.data.toString('utf8');
        } catch (error) {
            console.error(`Erro ao buscar o segredo "${secretName}":`, error);
            return null;
        }
    }

    /**
     * Carrega as variáveis de ambiente especificadas.
     * Em desenvolvimento, lê do process.env; caso contrário, busca no Secret Manager.
     *
     * @param {string[]} variablesList - Lista de nomes das variáveis a serem carregadas.
     * @returns {Promise<Object>} - Objeto com as variáveis carregadas.
     */
    async loadEnvVariables(variablesList) {
        const envConfig = {};

        if (process.env.NODE_ENV === 'development') {
            variablesList.forEach((variable) => {
                envConfig[variable] = process.env[variable];
            });
        } else {
            for (const variable of variablesList) {
                envConfig[variable] = await this.accessSecret(variable);
            }
        }

        return envConfig;
    }
}
