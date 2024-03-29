import dotenv from 'dotenv';
dotenv.config()
import productModel from '../models/productModel.js';
import uploadOnCloudinary from '../config/cloudinary.js';
import slugify from 'slugify';
import braintree from 'braintree';
import orderModel from '../models/orderModel.js';

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
});

// <--------------- CREATE PRODUCT --------------------->
export async function createProductController(req, res) {
    try {
        const { name, description, price, category, quantity } = req.body;
        const photo = req.file;

        //validation
        if (!name || !description || !price || !category || !quantity) {
            return res.status(404).send({
                success: false,
                message: "Please fill the all required fields!"
            })
        }

        if (!photo) {
            return res.status(404).send({ message: "Product image is required!" })
        }

        // upload product image on cloudinary
        const productPhoto = await uploadOnCloudinary(photo.path)


        // save product details in MONGODB
        const product = await productModel.create({
            name,
            slug: slugify(name),
            description,
            price,
            category,
            quantity,
            photo: productPhoto
        })

        res.status(201).send({
            success: true,
            message: "Product created successfully!",
            product
        })


    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while create product!"
        })
    }
};



// <--------------- GET ALL PRODUCTS --------------------->
export async function getAllProductsController(req, res) {

    const sort = req.query.sort || "";
    const category = req.query.category || "";
    const price = req.query.price || "";

    const query = {};
    if (category) {
        query.category = category
    }

    if (price) {
        query.price = {
            $lte: price
        }
    }

    try {
        const products = await productModel.find(query).sort(sort && sort === 'latest' ? '-createdAt' : 'createdAt');

        if (!products) {
            return res.send({ message: "No product found!" })
        }

        res.status(200).send({
            success: true,
            message: `${products.length} products found!`,
            products
        })


    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while get all products!"
        })
    }
};



// <--------------- GET SINGLE PRODUCT --------------------->
export async function getSingleProduct(req, res) {
    try {
        const product = await productModel.findOne({ slug: req.params.slug });
        if (!product) {
            return res.send({ message: "No product found with this keyword!" })
        }
        res.status(200).send({
            success: true,
            message: "Product found successfully!",
            product
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while get single products!"
        })
    }
};



// <--------------- DELETE PRODUCT --------------------->
export async function deleteProductController(req, res) {
    try {
        await productModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success: true,
            message: "Product deleted successfully!"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while delete products!"
        })
    }
};



// <--------------- UPDATE PRODUCT --------------------->
export async function updateProductController(req, res) {
    try {

        const { name, description, price, category, quantity } = req.body;
        const photo = req.file;

        //validation
        if (!name || !description || !price || !category || !quantity) {
            return res.status(404).send({
                success: false,
                message: "Please fill the all required fields!"
            })
        }

        if (!photo) {
            return res.status(404).send({ message: "Product image is required!" })
        }

        // upload product image on cloudinary
        const productPhoto = await uploadOnCloudinary(photo.path);

        const product = await productModel.findById(req.params.pid);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "No product found!"
            })
        }

        if (name) product.name = name;
        product.slug = slugify(name);
        if (description) product.name = description;
        if (price) product.name = price;
        if (category) product.name = category;
        if (quantity) product.name = quantity;

        await product.save();
        res.status(200).send({
            success: true,
            message: "Product updated successfully!",
            product
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while update products!"
        })
    }
}



// <--------------- GET CATEGORIES --------------------->
export async function getCategoriesController(req, res) {
    try {
        const categories = await productModel.distinct('category');
        if (categories) {
            res.status(200).send({
                success: true,
                message: "Categories",
                categories
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while get categories!"
        })
    }
};



// <---------------------- BRAINTREE GENRATE TOKEN CONTROLLER ---------------------->
export async function braintreeTokenController(req, res) {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({
                    success: true,
                    message: "Braintree token genrated successfully!",
                    response
                });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while genrate braintree token!"
        })
    }
};



// <---------------------- RECIVE PAYMENT CONTROLLER ---------------------->
export async function brainTreePaymentController(req, res) {
    try {
        const { nonce, products } = req.body;
        let total = 0;
        products.map((i) => {
            total += i.price * i.quantity;
        });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: products,
                        payment: result,
                        buyer: req.user.id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while get payment!"
        })
    }
};




// <------------------- SEARCH PRODUCT CONTROLLER -------------------> 
export async function searchProductController(req, res) {
    try {
        const keyword = req.params.keyword;
        const product = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            });
        if (product) {
            return res.status(200).send({
                success: true,
                message: "Product found successfully!",
                product
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success: false,
            message: "Error while search product!"
        })
    }
}


