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
    },


    setByName(name, value) {
        if (!Init.isInitialized) {
            throw new CustomError(
                "Bad request",
                "setGlobalByName",
                400,
                "Js Utils is not initialized"
            )
        }

        if (!name) {
            throw new CustomError(
                "Bad request",
                "setGlobalByName",
                400,
                "Variable name is required"
            )
        }

        if (!value) {
            throw new CustomError(
                "Bad request",
                "setGlobalByName",
                400,
                "Variable value is required"
            )
        }

        this.values[name] = value;
    }
}