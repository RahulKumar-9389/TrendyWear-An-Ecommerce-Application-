import express from 'express';
import { getAllOrdersController, getAllUsersController, getOrdersController, loginController, orderStatusController, registerController, updateProfileController } from '../controllers/authController.js';
import { isAdmin, isLogin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// REGISTER || POST 
router.post('/register', registerController);



// LOGIN || POST 
router.post('/login', loginController);



//PROTECED ROUTE
router.get('/user-auth', isLogin, function (req, res) {
    res.status(200).send('ok')
})



//ADMIN ROUTE
router.get('/admin-auth', isLogin, isAdmin, function (req, res) {
    res.status(200).send('ok')
})




// UPDATE PROFILE || PUT
router.put("/update-profile/:uid",
    isLogin,
    updateProfileController
);



// GET ALL USERS || GET
router.get('/users', getAllUsersController);



//ORDERS || GET
router.get("/orders",
    isLogin,
    getOrdersController
);



// GET ALL ORDERS
router.get("/all-orders",
    isLogin,
    isAdmin,
    getAllOrdersController
);




// UPDATE ORDER STATUS
router.put("/order-status/:orderId",
    isLogin,
    isAdmin,
    orderStatusController
);


export default router;