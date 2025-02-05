// /**
//  * Objeto interno que armazena a configuração global da lib.
//  * Outros módulos poderão acessar esses parâmetros via getGlobalConfig().
//  */
// let globalConfig = {
//   appName: '',
//   projectId: '',
//   firebaseApp: null,
//   // Adicione outros parâmetros globais padrão se necessário
// };
//
// /**
//  * Inicializa a lib com os parâmetros necessários.
//  *
//  * @param {Object} config - Objeto de configuração.
//  * @param {string} config.appName - Nome da aplicação (obrigatório).
//  * @param {string} config.projectId - ID do projeto (obrigatório).
//  * @param {Object} [config.firebaseConfig] - Configurações para inicializar o Firebase (opcional).
//  *
//  * @returns {Promise<Object>} Retorna a configuração global atualizada.
//  *
//  * @example
//  * import { init, getGlobalConfig } from '@tanakadigital/js-utils';
//  *
//  * (async () => {
//  *   await init({
//  *     appName: 'MinhaApp',
//  *     projectId: 'meu-projeto-id',
//  *     firebaseConfig: {
//  *       apiKey: 'SUA_API_KEY',
//  *       authDomain: 'seu-projeto.firebaseapp.com',
//  *       // ...outros parâmetros do Firebase
//  *     },
//  *   });
//  *
//  *   const config = getGlobalConfig();
//  *   console.log(config.appName); // 'MinhaApp'
//  * })();
//  */
// export const init = async (config) => {
//   if (!config.appName) {
//     throw new Error('O parâmetro "appName" é obrigatório na inicialização.');
//   }
//   if (!config.projectId) {
//     throw new Error('O parâmetro "projectId" é obrigatório na inicialização.');
//   }
//
//   // Atualiza a configuração global com os valores informados
//   globalConfig = { ...globalConfig, ...config };
//
//   // Se houver configuração para o Firebase, inicializa-o
//   if (config.firebaseConfig) {
//     try {
//       // Importação dinâmica para evitar erros caso o Firebase não esteja instalado
//       const { initializeApp } = await import('firebase/app');
//       globalConfig.firebaseApp = initializeApp(config.firebaseConfig);
//     } catch (error) {
//       console.error(
//         'Falha ao inicializar o Firebase. Verifique se a dependência "firebase/app" está instalada.',
//         error
//       );
//     }
//   }
//
//   // Aqui você pode realizar outras inicializações (ex.: setar chaves padrão, conectar a outros serviços, etc.)
//
//   return globalConfig;
// };
//
// /**
//  * Retorna a configuração global atualmente armazenada.
//  *
//  * @returns {Object} Objeto de configuração global.
//  */
// export const getGlobalConfig = () => globalConfig;
