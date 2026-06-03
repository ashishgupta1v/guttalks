import express from 'express';
import { getAllOrders, updateOrderStatus } from '../Controllers/OrderController.js';
import { adminLogin, getAdminProfile } from '../Controllers/adminController.js';
import { adminAuth } from '../Middleware/adminAuth.js';
const router = express.Router();


router.post('/login', adminLogin);
router.get('/profile', adminAuth, getAdminProfile);
router.get('/orders', getAllOrders )
router.put('/:orderId/status', updateOrderStatus );


export default router;