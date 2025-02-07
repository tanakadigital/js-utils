import {Init} from "../init/index.js";
import {CustomErrorAppName} from "../errors/http-errors/custom.error.js";

export const globals = {
    values: {},

    getByName(name) {
        if (!Init.isInitialized) {
            throw new CustomErrorAppName(
                "js-utils",
                "Bad request",
                "getGlobalByName",
                400,
                "Js Utils is not initialized"
            )
        }
        const ret = this.values[name];

        if (!ret) {
            throw new CustomErrorAppName(
                "js-utils",
                "Bad request",
                "getGlobalByName",
                400,
                "Variable " + name + " is not defined"
            )
        }

        return ret;
    }
}