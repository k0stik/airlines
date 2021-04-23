import { DataTypes as DT } from 'sequelize';
import Base   from './Base.mjs';
import Flight from './Flight.mjs';

class Airport extends Base {
    static STATUS_ACTIVE = 'ACTIVE';

    static STATUS_INACTIVE = 'INACTIVE';

    static schema = {
        id           : { type: DT.BIGINT, primaryKey: true, autoIncrement: true },
        title        : { type: DT.STRING, allowNull: false },
        status       : { type: DT.ENUM('ACTIVE', 'INACTIVE') },
        longitude    : { type: DT.FLOAT, allowNull: true },
        latitude     : { type: DT.FLOAT, allowNull: true  },
        city         : { type: DT.STRING, allowNull: false  },
        country      : { type: DT.STRING, allowNull: false  },
        airportClass : { type: DT.INTEGER, allowNull: false }, // from 1 to 5
        createdAt    : { type: DT.DATE, allowNull: false },
        updatedAt    : { type: DT.DATE, allowNull: false }
    };

    static initRelations() {
        /*
            this will add magic sequelize methods like getDepartureFlights(), getArrivalFlights() etc
        */
        this.hasMany(Flight, { foreignKey: 'departureAriportId', sourceKey: 'id', as: 'departureFlights' });
        this.hasMany(Flight, { foreignKey: 'arrivalAriportId', sourceKey: 'id', as: 'arrivalFlights' });
    }
}

export default Airport;
