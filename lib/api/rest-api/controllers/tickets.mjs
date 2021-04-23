import Create from '../../../use-cases/tickets/Create.mjs';
import chista from '../chista.mjs';

export default {
    create : chista.makeUseCaseRunner(Create, req => ({ ...req.query, ...req.params, ...req.body }))
};
