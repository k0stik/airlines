import ChistaX from 'chista/Exception.js';
import Base    from './../Base.mjs';
import Flight  from './../../domain-models/Flight.mjs';

/*
    We might use instance of this class when someone registers on the flight
*/
export default class SeatsCreate extends Base {
    static validationRules = {
        flightId : [ 'required', 'positive_integer'  ],
        number   : [ 'not_empty' ],
        fullname : [ 'not_empty' ]
    };

    async execute({ flightId, number, fullname }) {
        const flight = await Flight.findOneOrFail({ id: flightId });

        const seats = await flight.getSeats({ where: {  number } });

        if (seats.length) {
            throw new ChistaX({
                code   : 'SEAT_IS_ALREADY_TAKEN',
                fields : { number }
            });
        }

        const seat = await flight.createSeat({
            number,
            fullname
        });

        return {
            data : seat
        };
    }
}
