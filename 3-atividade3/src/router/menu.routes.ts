import express from 'express';
import { createMenu, deleteMenu, getMenuById, getMenus, updateMenu } from '../services/order_restaurant/menu';

const router = express.Router();

router.post('/', createMenu);
router.get('/', getMenus);
router.get('/:id', getMenuById);
router.put('/:id', updateMenu);
router.delete('/:id', deleteMenu);

export default router;
