import express from 'express';

import { createProduct, deleteProduct, getAllProducts, sellProducts, updateProduct } from '../services/product';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/sellProducts', sellProducts);

export default router;
