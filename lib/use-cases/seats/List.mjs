import ChistaX from 'chista/Exception.js';
import Base    from './../Base.mjs';
import Flight  from './../../domain-models/Flight.mjs';

export default class SeatsList extends Base {
    static validationRules = {
        flightId : [ 'required', 'positive_integer'  ]
    };

    async execute({ flightId, number, fullname }) {
        const flight = await Flight.findOneOrFail({ id: flightId });

        const seats = await flight.getSeats();

        return {
            data : seats
        };
    }
}
