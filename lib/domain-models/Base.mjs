import Sequelize from 'sequelize';
import ChistaX   from 'chista/Exception.js';

class Base extends Sequelize.Model {
    static init(sequelize, options = {}) {
        super.init(this.schema, {
            tableName : this.tableName,
            ...options,
            sequelize,
            ...this.options
        });
    }

    static initRelationsAndHooks() {
        if (this.initRelations) this.initRelations();
        if (this.initHooks) this.initHooks();
    }

    static async findOneOrFail(data, fields = null) {
        const entity = await this.findOne(data);

        if (!entity) {
            throw new ChistaX({
                code   : `${this.options.name.singular.toUpperCase()}_NOT_FOUND`,
                fields : fields || data?.where || {}
            });
        }

        return entity;
    }
}

export default Base;
