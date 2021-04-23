import * as RestAPI     from './lib/api/rest-api/app.mjs';
import * as DomainModel from './lib/domain-models/index.mjs';
import UseCaseBase      from './lib/use-cases/Base.mjs';
import config           from './lib/config.cjs';


async function main() {
    RestAPI.start({ appPort: config.appPort });

    const { sequelize } = DomainModel.initModels(config.db);

    // Init Use Cases Layer
    UseCaseBase.setSequelizeInstanse(sequelize);

    // Subscribe to system signals
    process.on('SIGTERM', async () => {
        await shutdown();
    });

    process.on('SIGINT', async () => {
        await shutdown();
    });

    process.on('unhandledRejection', error => {
        console.error(error);
    });

    process.on('uncaughtException', error => {
        console.error(error);
    });

    // Graceful shutdown
    async function shutdown() {
        await RestAPI.stop();
        process.exit(0);
    }
    // initCache(config.memcached);
}

main().catch((err) => {
    console.error(err);

    process.exit(1);
});
