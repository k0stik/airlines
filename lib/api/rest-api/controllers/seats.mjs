import Create from '../../../use-cases/seats/Create.mjs';
import List   from '../../../use-cases/seats/List.mjs';
import chista from '../chista.mjs';

export default {
    list   : chista.makeUseCaseRunner(List, req => ({ ...req.query, ...req.params })),
    create : chista.makeUseCaseRunner(Create, req => ({ ...req.query, ...req.params, ...req.body }))
};
