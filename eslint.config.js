import globals from "globals";
import importPlugin from "eslint-plugin-import";

export default [
    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module", // Indica que estamos usando ES Modules
            },
            globals: globals.browser, // Adiciona suporte aos globais do navegador
        },
        plugins: {
            import: importPlugin,
        },
        rules: {
            "semi": ["error", "always"], // Exige ponto e vírgula no final das linhas
            "import/no-absolute-path": "error", // Proíbe imports com caminho absoluto
            "import/order": ["error", {"newlines-between": "always"}], // Organiza imports
            "prefer-const": "error", // Obriga o uso de `const` para variáveis imutáveis
        },
    },
];
