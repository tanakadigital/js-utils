import {Init} from "../init/index.js";
import {BadRequestError} from "../errors/index.js";

export const globals = {
    values: {},

    getByName(name) {
        if (!Init.isInitialized) {
            throw new BadRequestError(
                "Bad request",
                "getGlobalByName",
                "Bad request",
                "Js Utils is not initialized"
            )
        }
        const ret = this.values[name];

        if (!ret) {
            throw new BadRequestError(
                "Bad request",
                "getGlobalByName",
                "Bad request",
                "Variable " + name + " is not defined"
            )
        }

        return ret;
    }
}