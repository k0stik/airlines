import { DataTypes as DT } from 'sequelize';
import Base    from './Base.mjs';
import Airport from './Airport.mjs';
import Seat    from './Seat.mjs';
import Ticket  from './Ticket.mjs';

class Flight extends Base {
    static options = {
        scopes : {
            //  ...
        }
    }

    static schema = {
        id                   : { type: DT.BIGINT, primaryKey: true, autoIncrement: true },
        title                : { type: DT.STRING, allowNull: false },
        plane                : { type: DT.STRING, allowNull: false },
        totalSeats           : { type: DT.INTEGER, allowNull: false },
        type                 : { type: DT.ENUM('REGULAR', 'CHARTER') },
        departureAriportId   : { type: DT.BIGINT, allowNull: false },
        arrivalAriportId     : { type: DT.BIGINT, allowNull: false },
        plannedDepartureTime : { type: DT.DATE },
        plannedArrivalTime   : { type: DT.DATE },
        realDepartureTime    : { type: DT.DATE },
        realArrivalTime      : { type: DT.DATE },
        gate                 : { type: DT.STRING },
        status               : { type: DT.ENUM('PENDING', 'BOARDING', 'IN_FLIGHT', 'ARRIVED') }
    };

    static initRelations() {
        /*
            this will add magic sequelize methods like getDepartureAriport(), getArrivalAriport() etc
        */
        this.belongsTo(Airport, { foreignKey: 'departureAriportId', targetKey: 'id', as: 'departureAriport' });
        this.belongsTo(Airport, { foreignKey: 'arrivalAriportId', targetKey: 'id', as: 'arrivalAriport' });
        this.hasMany(Seat, { foreignKey: 'arrivalAriportId', sourceKey: 'id', as: 'arrivalFlights' });
        this.hasMany(Ticket, { foreignKey: 'arrivalAriportId', sourceKey: 'id', as: 'tickets' });
    }
}

export default Flight;
