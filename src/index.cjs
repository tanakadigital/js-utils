// index.cjs (Para CommonJS)
const Errors = require("./errors/index.js");
const Discord = require("./discord/index.js");
const Logs = require("./logs/index.js");
const Utils = require("./utils/index.js");

module.exports = {
    ...Errors,
    ...Discord,
    ...Logs,
    ...Utils,
};
