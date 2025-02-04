import {
    prepareRequest,
    errorHandlerMiddleware
} from './error-handler.middleware.js';

export const errorHandler = {
    prepareRequest,
    errorHandlerMiddleware
}

export { createFirebaseAuthMiddleware } from './firebase-auth.middleware.js'