import { DataTypes as DT } from 'sequelize';
import Base   from './Base.mjs';
import Flight from './Flight.mjs';

class Ticket extends Base {
    static schema = {
        id       : { type: DT.BIGINT, primaryKey: true, autoIncrement: true },
        flightId : { type: DT.STRING, allowNull: false },
        fullname : { type: DT.STRING, allowNull: false }
    };

    static initRelations() {
        /*
            this will add magic sequelize methods like getDepartureFlights(), getArrivalFlights() etc
        */
        this.belongsTo(Flight, { foreignKey: 'flightId', targetKey: 'id', as: 'flight' });
    }
}

export default Ticket;
