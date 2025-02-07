let cachedEnvVariables = null;

const loadEnvVariables = async () => {
    if (!cachedEnvVariables) {
        cachedEnvVariables = {
            appName: 'auth-api',
            projectId: process.env.GCP_PROJECT_ID,

        };
    }
    return cachedEnvVariables;
};

// Carregamos as variáveis uma única vez e exportamos
const constants = await loadEnvVariables();

export const appName = constants.appName;
export const projectId = constants.projectId;