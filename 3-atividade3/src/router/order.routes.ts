import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrder,
  deleteOrder,
  finishOrder,
  getOpenOrders,
  getClosedOrders,
} from '../services/order_restaurant/order';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/open', getOpenOrders);
router.get('/closed', getClosedOrders);
router.get('/:id', getOrderById);
router.put('/:id/finish', finishOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
