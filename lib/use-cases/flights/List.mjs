import Base    from './../Base.mjs';
import Airport from './../../domain-models/Airport.mjs';
import Flight  from './../../domain-models/Flight.mjs';

const DEFAULT_LIMIT = 20;

export default class FlightsList extends Base {
    static validationRules = {
        ariportId : [ 'required', 'positive_integer' ],
        type      : [ 'required', { 'one_of': [ 'departure', 'arrival' ] }  ],
        limit     : [ 'positive_integer' ],
        offset    : [ 'positive_integer' ],
        sortedBy  : [ { 'one_of': [ 'departureTime', 'arrivalTime' ] } ],
        order     : [ { 'one_of': [ 'ASC', 'DESC' ] } ]
    };

    async execute({ airportId, type, limit = DEFAULT_LIMIT, offset = 0, sortedBy, order }) {
        const airport = await Airport.findOneOrFail({ where: { id: airportId } });

        const flights = await Flight.findAll({
            where : {
                airportId : airport.id,
                ...(type === 'departure' ? { departureAriportId: airportId } : {}),
                ...(type === 'arrival' ? { arrivalAriportId: airportId } : {})
            },
            order : [ [ sortedBy, order ] ],
            limit,
            offset
        });

        return {
            data : flights
        };
    }
}
