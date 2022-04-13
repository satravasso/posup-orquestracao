import express from 'express';

import { getUsers, getUserById, createUser, updateUser, deteleUser } from '../services/user';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deteleUser);

export default router;
