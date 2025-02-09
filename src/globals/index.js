import {Init} from "../init/index.js";
import {CustomError} from "../errors/index.js";

export const globals = {
    values: {},

    getByName(name) {
        if (!Init.isInitialized) {
            throw new CustomError(
                "Bad request",
                "getGlobalByName",
                400,
                "Js Utils is not initialized"
            )
        }
        const ret = this.values[name];

        if (!ret) {
            throw new CustomError(
                "Bad request",
                "getGlobalByName",
                400,
                "Variable " + name + " is not defined"
            )
        }

        return ret;
    }
}