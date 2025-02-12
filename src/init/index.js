import {globals} from "../globals/index.js";

export const Init = {
    isInitialized: false,
    mongoClientDatabase: null,
    inititalizeJsUtils(
        appName,
        admin,
        projectId,
        mongoClient,
        applicationDatabaseName
    ) {
        if (!this.isInitialized) {
            globals.values.appName = appName;
            globals.values.projectId = projectId;
            globals.values.admin = admin;

            this.mongoClientDatabase = mongoClient.db(applicationDatabaseName)

            globals.values.apisKeysCollection = this.mongoClientDatabase.collection("apisKeys");
            globals.values.apisRegistryCollection = this.mongoClientDatabase.collection("apisRegistry");

            this.isInitialized = true;
        }
    },
}
