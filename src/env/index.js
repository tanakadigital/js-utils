// src/env-utils/index.js
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import {SecretManagerServiceClient} from '@google-cloud/secret-manager';
import {ServerError} from '../errors/index.js';

dotenv.config();

const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credentialsPath) {
    throw new ServerError('GOOGLE_APPLICATION_CREDENTIALS não está definido.');
}

const absolutePath = path.isAbsolute(credentialsPath)
    ? credentialsPath
    : path.join(process.cwd(), credentialsPath);

let credentials;
try {
    const fileContent = fs.readFileSync(absolutePath, 'utf8');
    credentials = JSON.parse(fileContent);
} catch (error) {
    throw new ServerError(`Erro ao ler as credenciais em ${absolutePath}: ${error.message}`);
}

const projectId = credentials.project_id;
if (!projectId) {
    throw new ServerError('project_id não encontrado nas credenciais.');
}

const secretManagerClient = new SecretManagerServiceClient();
const envCache = {};

async function accessSecret(secretName) {
    try {
        const [version] = await secretManagerClient.accessSecretVersion({
            name: `projects/${projectId}/secrets/${secretName}/versions/latest`
        });
        return version.payload.data.toString('utf8');
    } catch (error) {
        console.error(`Erro ao buscar o segredo "${secretName}":`, error);
        return null;
    }
}

export const EnvUtils = {
    async getEnvVariable(variableName, throwsOnEmpty = true) {
        if (envCache[variableName]) {
            return envCache[variableName];
        }

        let value;
        if (process.env.NODE_ENV === 'development') {
            value = process.env[variableName] || null;
        } else {
            value = await accessSecret(variableName);
        }

        if (value) {
            envCache[variableName] = value;
            return value;
        }

        if (throwsOnEmpty) {
            throw new ServerError(`Variável de ambiente "${variableName}" não encontrada.`);
        }

        return null;
    }
};
