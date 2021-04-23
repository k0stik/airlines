import Update from '../../../use-cases/flights/Update.mjs';
import List   from '../../../use-cases/flights/List.mjs';
import chista from '../chista.mjs';

export default {
    list   : chista.makeUseCaseRunner(List, req => ({ ...req.query, ...req.params })),
    Update : chista.makeUseCaseRunner(Update, req => ({ ...req.query, ...req.params, ...req.body }))
};
