import express from 'express';
import { getUsers, createUser, login, deleteUser, tokenIsValid  } from '../controllers/users.js';
import { auth } from '../middleware/auth.js'


const router = express.Router();
router.get('/', getUsers);

router.post('/createUser', createUser);
router.post('/login', login);
router.delete('/deleteUser', auth, deleteUser);
router.post('/tokenIsValid',tokenIsValid)
 
export default router;