import {profiler} from "../profiler/profiler.js";


export const profilerMiddleware = {
    middleware: (req, res, next) => {
        // Define o limite padrão para a requisição (pode ser alterado se necessário)
        req.profiler = profiler.createProfiler(`${req.method} ${req.url}`, 1000);

        // Quando a requisição terminar, finalizamos o profiler e verificamos se precisa notificar
        res.prependListener("finish", () => {
            req.profiler.finishProcess();
        });

        next();
    }
};
