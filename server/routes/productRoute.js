import express from 'express';
import {
    brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getAllProductsController,
    getCategoriesController,
    getSingleProduct,
    searchProductController,
    updateProductController
} from '../controllers/productController.js';
import { upload } from '../middlewares/multer.js'
import { isAdmin, isLogin } from '../middlewares/authMiddleware.js';

const router = express.Router();



// CREATE PRODUCT || POST
router.post('/create-product',
    isLogin,
    isAdmin,
    upload.single('photo'),
    createProductController
);



// UPDATE PRODUCT || PUT 
router.put('/update-product/:pid',
    isLogin,
    isAdmin,
    upload.single('photo'),
    updateProductController
);



// DELETE PRODUCT || DELETE 
router.delete('/delete-product/:pid',
    isLogin,
    isAdmin,
    deleteProductController
)


// GET ALL PRODUCTS || GET
router.get('/products', getAllProductsController)



// GET SINGLE PRODUCT || GET
router.get('/product/:slug', getSingleProduct)



// GET CATEGORIES || GET
router.get('/categories', getCategoriesController)



// GENRATE BRAINTREE TOKEN || GET
router.get('/braintree/token', braintreeTokenController);



// RECIVE PAYMENT || POST
router.post(
    '/braintree/payment',
    isLogin,
    brainTreePaymentController
)




// SEARCH PRODUCT
router.get("/search/:keyword", searchProductController);



export default router;