import Sequelize from 'sequelize';
import Airport   from './Airport.mjs';
import Flight    from './Flight.mjs';

export default function initAllModels(dbConfig) {
    const { database, username, password, dialect, host, port } = dbConfig;

    const sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect,
        logging        : false,
        dialectOptions : {
            connectTimeout : 10000,
            timezone       : 'Europe/Kiev'
        },
        timezone : 'Europe/Kiev',
        pool     : {
            min     : 5,
            max     : 50,
            idle    : 10000, // The maximum time, in milliseconds, that a connection can be idle before being released.
            acquire : 20000 // ..., that pool will try to get connection before throwing error
        },
        retry : { // Set of flags that control when a query is automatically retried.
            match : [
                /SequelizeConnectionError/,
                /SequelizeConnectionRefusedError/,
                /SequelizeHostNotFoundError/,
                /SequelizeHostNotReachableError/,
                /SequelizeInvalidConnectionError/,
                /SequelizeConnectionTimedOutError/,
                /TimeoutError/,
                /SequelizeDatabaseError/
            ],
            max : 4 // How many times a failing query is automatically retried.
        }
    });

    const models = {
        Airport,
        Flight
    };

    Object.values(models).forEach(model => model.init(sequelize));
    Object.values(models).forEach(model => model.initRelationsAndHooks(sequelize));

    sequelize.sync({ force: true });

    return {
        ...models,
        sequelize
    };
}
