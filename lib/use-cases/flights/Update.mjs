import Base    from './../Base.mjs';
import Airport from './../../domain-models/Airport.mjs';
import Flight  from './../../domain-models/Flight.mjs';

export default class FlightsList extends Base {
    static validationRules = {
        flightId             : [ 'required', 'positive_integer'  ],
        title                : [ 'not_empty' ],
        plane                : [ 'not_empty' ],
        type                 : [ 'not_empty' ],
        departureAriportId   : [ 'not_empty' ],
        arrivalAriportId     : [ 'not_empty' ],
        plannedDepartureTime : [ 'not_empty' ],
        plannedArrivalTime   : [ 'not_empty' ],
        realDepartureTime    : [ 'not_empty' ],
        realArrivalTime      : [ 'not_empty' ],
        gate                 : [ 'not_empty' ],
        status               : [ 'not_empty' ]
    };

    async execute({ flightId, ...params }) {
        const flight = await Flight.findOneOrFail({ where: { id: flightId } });

        if (params.departureAriportId) {
            await Airport.findOneOrFail({ where: { id: params.departureAriportId } });
        }

        if (params.arrivalAriportId) {
            await Airport.findOneOrFail({ where: { id: params.arrivalAriportId } });
        }

        await flight.update(params);

        return {
            data : flight
        };
    }
}
