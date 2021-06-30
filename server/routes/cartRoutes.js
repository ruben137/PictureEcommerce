import express from 'express'
import { addPrevICartItems, addProductToCart, checkIfAvailable, clearCart, getCartITems, removeCartItem } from '../controllers/cartController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/:user',getCartITems)
router.get("/isAvailable/item/:id",checkIfAvailable)
router.post('/newCartProduct/:user',addProductToCart)
router.post('/addPrevItems/:user',addPrevICartItems)
router.patch('/clearCart',auth,clearCart)
router.patch('/deleteCartItem/:user/:id',removeCartItem)

export default router