// src/env-utils/index.js
import dotenv from 'dotenv';

import {ServerError} from '../errors/index.js';
import {discordService} from "../discord/index.js";

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

            const embedFields = [
                {
                    name: "AppName",
                    value: process.env.APP_NAME || "Não encontrado"
                }, {
                    name: "Variável de ambiente",
                    value: variableName
                },
                {
                    name: "Valor",
                    value: "Não encontrado"
                }
            ];

            await discordService.sendApplicationDiscord(
                `Variável de ambiente "${variableName}" não encontrada.`,
                "Aplicacao será encerrada.",
                embedFields
            );

            throw new ServerError(`Variável de ambiente "${variableName}" não encontrada.`);
        }

        return null;
    }
};
