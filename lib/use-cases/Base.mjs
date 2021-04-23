import ServiceBase   from 'chista/ServiceBase.js';

export default class UseCaseBase extends ServiceBase {
    constructor(...params) {
        super(...params);
    }

    static sequelizeInstanse = null;

    static setSequelizeInstanse(sequelize) {
        UseCaseBase.sequelizeInstanse = sequelize;
    }

    run(...args) {
        if (!UseCaseBase.sequelizeInstanse) /* c8 ignore next */ return super.run(...args);

        const run = super.run.bind(this);
        const transaction = global.testTransaction /* c8 ignore next */ || null;

        return UseCaseBase.sequelizeInstanse.transaction({ transaction }, () => run(...args));
    }
}
