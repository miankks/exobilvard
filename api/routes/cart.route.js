import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cart.controller.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/addcart',authMiddleware, addToCart);
cartRouter.post('/removecar', removeFromCart);
// cartRouter.post('/removecar',authMiddleware, removeFromCart);
cartRouter.post('/getcart',authMiddleware, getCart);

export default cartRouter;