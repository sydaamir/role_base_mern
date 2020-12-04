import express from 'express';
import { getUsers, createUser, login, deleteUser, tokenIsValid, user, fetchUser, generateLoan, fetchLoanUser, getLoanUsers, approveLoan, rejectLoan } from '../controllers/users.js';
import { auth } from '../middleware/auth.js'


const router = express.Router();

router.get('/', getUsers);
router.post('/createUser', createUser);
router.post('/login', login);
router.delete('/deleteUser', auth, deleteUser);
router.post('/tokenIsValid', tokenIsValid);
router.post('/generateLoan', generateLoan);
router.get('/user', auth, user);
router.get('/fetchUser/:id', fetchUser);
router.get('/fetchLoanUser/:id', fetchLoanUser);
router.get('/getLoanUsers', getLoanUsers);
router.patch('/rejectLoan/:id', rejectLoan);
router.patch('/approveLoan/:id', approveLoan);



export default router;