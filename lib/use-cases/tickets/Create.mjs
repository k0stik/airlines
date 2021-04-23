import ChistaX from 'chista/Exception.js';
import Base    from './../Base.mjs';
import Flight  from './../../domain-models/Flight.mjs';

export default class TicketsCreate extends Base {
    static validationRules = {
        flightId : [ 'required', 'positive_integer'  ],
        fullname : [ 'not_empty'  ]
    };

    async execute({ flightId, fullname }) {
        const flight = await Flight.findOneOrFail({ id: flightId });

        const totalSold = await flight.getTicketsCount();

        if (totalSold >= flight.totalSeats) {
            throw new ChistaX({
                code : 'FLIGHT_IS_FULL'
            });
        }

        const ticket = await flight.createTicket({ fullname });

        return {
            data : ticket
        };
    }
}
