// src/env-utils/index.js
import dotenv from 'dotenv';

import {ServerError} from '../errors/index.js';

const envCache = {};

dotenv.config();

export const envUtils = {
    async getEnvVariable(variableName, throwsOnEmpty = true) {

        if (envCache[variableName]) {
            return envCache[variableName];
        }

        const value = process.env[variableName] || null;

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
