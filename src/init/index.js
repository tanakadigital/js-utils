import {globals} from "../globals.js";

export const Init = {
    isInitialized: false,

    inititalizeJsUtils(appName, admin, projectId) {
        if (!this.isInitialized) {
            globals.values.appName = appName;
            globals.values.projectId = projectId;
            globals.values.admin = admin;

            this.isInitialized = true;
        }
    },
}



