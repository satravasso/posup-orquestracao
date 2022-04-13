import express from 'express';
import { createPizza, deletePizza, getPizzaById, getPizzas, getTotalPizza, updatePizza } from '../services/pizza';

const router = express.Router();

router.post('/', createPizza);
router.get('/', getPizzas);
router.get('/totalPizza', getTotalPizza);
router.get('/:id', getPizzaById);
router.put('/:id', updatePizza);
router.delete('/:id', deletePizza);

export default router;
