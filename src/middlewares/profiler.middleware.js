import {profiler} from "../profiler/profiler.js";

export const profilerMiddleware = (req, res, next) => {
    // Define o limite padrão para a requisição (pode ser alterado se necessário)
    req.profiler = profiler.createProfiler(`${req.method} ${req.originalUrl}`, 1000);

    // Quando a requisição terminar, finalizamos o profiler e verificamos se precisa notificar
    res.on("finish", () => {
        req.profiler.finishProcess();
    });

    next();
};
