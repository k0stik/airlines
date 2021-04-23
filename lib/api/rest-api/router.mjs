import express     from 'express';
import controllers from './controllers/index.mjs';

const router = express.Router();

router.get('/flights',       controllers.flights.list);
router.patch('/flights/:id', controllers.flights.update);

router.get('/seats',     controllers.seats.list);
router.post('/seats',    controllers.seats.create);

router.post('/tickets',    controllers.tickets.create);

export default router;
