import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import bcrypt from 'bcrypt';


// <------------------ REGISTER CONTROLLER ----------------------> 
export async function registerController(req, res) {
    try {
        const { name, email, address, password } = req.body;

        if (!name || !email || !address || !password) {
            return res.status(404).send({
                success: false,
                message: "Please fill all required fields!"
            })
        }

        // chek if user already register
        const existing_user = await userModel.findOne({ email });
        if (existing_user) {
            return res.status(200).send({
                success: false,
                message: "Email already registered!"
            })
        };


        // save user details in database
        const user = await userModel.create({ name, email, address, password });
        res.status(201).send({
            success: true,
            message: "Register successfully!",
            user
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while user register!"
        })
    }
};



// <------------------ LOGIN CONTROLLER ----------------------> 
export async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }

        // chek, user is register user 
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials"
            })
        };

        // compare password
        const compared_password = await user.comparePassword(password);
        if (!compared_password) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password!"
            })
        };


        // genrate token
        const token = await user.genrateToken();

        // send response
        res.status(200).send({
            success: true,
            message: "Login Successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while user login!",
        })
    }
};




// <------------------ UPDATE PROFILE CONTROLLER ----------------------> 
export async function updateProfileController(req, res) {
    try {
        const { name, email, password, address } = req.body;
        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }

        const hashed_password = await bcrypt.hash(password, 10);
        // update user 
        const user = await userModel.findByIdAndUpdate(req.params.uid,
            { name, password: hashed_password, address },
            { new: true })


        res.status(201).send({
            success: true,
            message: "Profile updated!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                address: user.address
            }
        })


    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Error while user register",
            success: false,
            error
        })
    }
};



// <----------------------- GET ALL USERS ---------------------->
export async function getAllUsersController(req, res) {
    try {
        const users = await userModel.find({});
        if (users.length < 1) {
            return res.status(200).send({
                success: true,
                message: "There are no users."
            })
        }

        res.status(200).send({
            success: true,
            message: "All-Users",
            users
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while get users"
        })
    }
};



// <---------------- GET ORDER CONTROLLER ----------------->
export async function getOrdersController(req, res) {
    try {
        const orders = await orderModel
            .find({ buyer: req.user.id })
            .populate("products",)
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};



// <---------------- GET ALL ORDERS  ----------------->
export async function getAllOrdersController(req, res) {
    try {
        const orders = await orderModel
            .find({})
            .populate("products")
            .populate("buyer", "name")
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};




// <---------------- UPDATE ORDER STATUS ----------------->
export async function orderStatusController(req, res) {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};




