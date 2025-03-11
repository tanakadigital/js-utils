// src/env-utils/index.js
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import {SecretManagerServiceClient} from '@google-cloud/secret-manager';

import {ServerError} from '../errors/index.js';
import {discordService} from "../discord/index.js";
import {constants} from "../utils/index.js";

let secretManagerClient = null;
const envCache = {};

dotenv.config();

export const envUtils = {
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

const accessSecret = async (secretName) => {
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!credentialsPath) {
        throw new ServerError('GOOGLE_APPLICATION_CREDENTIALS não está definido.');
    }

    if (!secretManagerClient) {
        secretManagerClient = new SecretManagerServiceClient();
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

    try {
        const [version] = await secretManagerClient.accessSecretVersion({
            name: `projects/${projectId}/secrets/${secretName}/versions/latest`
        });
        return version.payload.data.toString('utf8');
    } catch (error) {
        console.error(`Erro ao buscar o segredo "${secretName}":`, error);
        await discordService.sendApplicationDiscord(
            `Erro ao buscar o segredo "${secretName}":`,
            "e.message: " + error.message,
            null,
        );
        return null;
    }
};
