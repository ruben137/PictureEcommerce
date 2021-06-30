import express from 'express'

import { getProducts, getProduct, addProduct, deleteProduct, updateProduct, getFullProduct, buyProduct, getPurchases, getPurchasedPic, getProductsAdmin} from '../controllers/productControllers.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/home/:page', getProducts)
router.get('/adminProducts',getProductsAdmin)

router.get('/getProduct/:id', getProduct)
router.get('/fullProduct/:id',auth,getFullProduct)
router.post('/addProduct', addProduct)
router.post('/buyProducts/:user',buyProduct)
router.get("/getPurchasedPic/:token",getPurchasedPic)
router.get('/purchases',auth,getPurchases)
router.patch('/updateProduct',updateProduct)
router.delete('/deleteProduct/:id',deleteProduct)


export default router