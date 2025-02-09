import {globals} from "../globals/index.js";

export const Init = {
    isInitialized: false,
    inititalizeJsUtils(appName, admin, projectId, clientsCollection) {
        if (!this.isInitialized) {
            globals.values.appName = appName;
            globals.values.projectId = projectId;
            globals.values.admin = admin;
            globals.values.clientsCollection = clientsCollection;

            this.isInitialized = true;
        }
    },
}
