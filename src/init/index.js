import {globals} from "../globals/index.js";

export const Init = {
    isInitialized: false,
    inititalizeJsUtils(
        appName,
        admin,
        projectId,
        mongoClient,
        applicationDatabaseName,
        asyncScheduleEventProcessorTask
    ) {
        if (!this.isInitialized) {

            globals.values.appName = appName;
            globals.values.projectId = projectId;
            globals.values.admin = admin;

            globals.values.mongoClientDatabase = mongoClient.db(applicationDatabaseName);

            globals.values.apisKeysCollection = globals.values.mongoClientDatabase.collection("apisKeys");
            globals.values.apisRegistryCollection = globals.values.mongoClientDatabase.collection("apisRegistry");

            globals.values.asyncScheduleEventProcessorTask = asyncScheduleEventProcessorTask;

            this.isInitialized = true;
        }
    },
};
