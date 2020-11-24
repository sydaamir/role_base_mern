import express from 'express';
import { createAgent, createAdmin, getUsers  } from '../controllers/users.js';

const router = express.Router();
router.get('/', getUsers);
router.post('/createAdmin', createAdmin);
router.post('/createAgent', createAgent);
export default router;