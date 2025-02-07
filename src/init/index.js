import {globals} from "../globals/index.js";
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
