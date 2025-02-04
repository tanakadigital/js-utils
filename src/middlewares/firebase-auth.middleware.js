import { getFirebaseUserFromRequest } from '@tanakadigital/js-firebase-auth';

export const createFirebaseAuthMiddleware = (admin, appName) => {
    return async (req, res, next) => {
        try {
            const firebaseUserFromRequestData = await getFirebaseUserFromRequest(
                req,
                admin,
                appName,
                true // doThrow
            );
            req.firebaseUser = firebaseUserFromRequestData.firebaseUser;
            next();
        } catch (error) {
            next(error);
        }
    };
};