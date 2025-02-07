import {BadRequestError} from "../errors/index.js";

export const Init = {
    isInitialized: false,
    globals: {},
    inititalizeJsUtils(appName, admin, projectId) {
        if (!this.isInitialized) {
            this.globals.appName = appName;
            this.globals.projectId = projectId;
            this.globals.admin = admin;

            this.isInitialized = true;
        }
    },
    getGlobalByName(name) {
        if (!this.isInitialized) {
            throw new BadRequestError(
                "init-js-utils",
                "Bad request",
                "getGlobalByName",
                "Bad request",
                "Js Utils is not initialized"
            )
        }
        const ret = this.globals[name];

        if (!ret) {
            throw new BadRequestError(
                "init-js-utils",
                "Bad request",
                "getGlobalByName",
                "Bad request",
                "Js Utils is not initialized"
            )
        }

        return ret;
    }
}



