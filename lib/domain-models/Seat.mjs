import { DataTypes as DT } from 'sequelize';
import Base   from './Base.mjs';
import Flight from './Flight.mjs';

class Seat extends Base {
    static options = {
        scopes : {
            //  ...
        }
    }

    static schema = {
        id       : { type: DT.BIGINT, primaryKey: true, autoIncrement: true },
        flightId : { type: DT.BIGINT, allowNull: false },
        number   : { type: DT.STRING, allowNull: false }, // e.g 1A, 1B, 1C
        fullname : { type: DT.STRING, allowNull: false }
    };

    static initRelations() {
        /*
            this will add magic sequelize methods like getDepartureAriport(), getArrivalAriport() etc
        */
        this.belongsTo(Flight, { foreignKey: 'flightId', targetKey: 'id', as: 'flight' });
    }
}

export default Seat;
