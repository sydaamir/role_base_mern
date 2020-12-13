import express from 'express';
import { getUsers, createUser, login, deleteUser, tokenIsValid, user, fetchUser, generateLoan, fetchLoanUser, getLoanUsers, approveLoan, rejectLoan } from '../controllers/users.js';
import { auth } from '../middleware/auth.js'


const router = express.Router();

router.get('/',auth, getUsers);
router.post('/createUser', createUser);
router.post('/login', login);
router.delete('/deleteUser', auth, deleteUser);
router.post('/tokenIsValid', tokenIsValid);
router.post('/generateLoan',auth, generateLoan);
router.get('/user', auth, user);
router.get('/fetchUser/:id',auth, fetchUser);
router.get('/fetchLoanUser/:id', auth, fetchLoanUser);
router.get('/getLoanUsers',auth, getLoanUsers);
router.patch('/rejectLoan/:id', auth, rejectLoan);
router.patch('/approveLoan/:id', auth, approveLoan);



export default router;