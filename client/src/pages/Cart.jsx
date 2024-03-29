import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import { decreaseItemQuantity, increaseItemQuantity, removeItem } from "../redux/cartSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { LiaEditSolid } from "react-icons/lia";
import { HiArrowLongRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiShoppingBag2Fill } from "react-icons/ri";

const Cart = () => {

    const products = useSelector((state) => state.cart.cart);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const totalPrice = () => {
        try {
            let total = 0;
            products.map((p) => {
                total = total + (p.price * p.quantity)
            })
            return total;
        } catch (error) {
            console.log(error.message);
        }
    }


    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseItemQuantity(id))
    }

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseItemQuantity(id))
    }

    const handleRemoveItem = (id) => {
        dispatch(removeItem(id))
        toast.success("Product removed", {
            className: 'toast'
        })
    };


    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get("https://trendywear.onrender.com/api/v1/product/braintree/token");
            if (data && data.success) {
                setClientToken(data?.response.clientToken);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getToken();
    }, [auth.token]);


    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            await axios.post("https://trendywear.onrender.com/api/v1/product/braintree/payment", {
                nonce,
                products,
            }, { headers: { "Authorization": auth.token } });
            dispatch(emptyCart())
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    };




    return <>
        <Layout title="Cart">

            {
                products.length ?
                    <>
                        <section id="cart">
                            <div className="cart_table_container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((p, i) => {
                                                return <tr key={i}>
                                                    <td aria-label="IMAGE"><img src={p.photo} alt={p.name} /></td>
                                                    <td aria-label="PRODUCTS">{p.name}</td>
                                                    <td aria-label="PRICE">₹ {p.price}</td>
                                                    <td aria-label="QUANTITY">
                                                        <div className="quantity">
                                                            <button
                                                                onClick={() => handleDecreaseQuantity(p._id)}
                                                                className={p.quantity <= 1 ? 'disable_btn' : ''}
                                                            > - </button>
                                                            <button>{p.quantity}</button>
                                                            <button
                                                                onClick={() => handleIncreaseQuantity(p._id)}
                                                                className={p.quantity >= 5 ? 'last disable_btn' : 'last'}
                                                            > + </button>
                                                        </div>
                                                    </td>
                                                    <td aria-label="TOTAL">₹ {p.quantity * p.price}</td>
                                                    <td aria-label="REMOVE" onClick={() => handleRemoveItem(p._id)}><MdOutlineDeleteOutline className="remove_icon" /></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="chekout_container">

                                <div className="address">
                                    <span>Address:</span>
                                    <p>{auth?.user?.address}</p>
                                    <LiaEditSolid className="address_edit_icon" onClick={() => navigate('/dashboard/user/update-profile')} />
                                </div>

                                <div className="price">
                                    <p>SUBTOTAL:</p>
                                    <h3>₹ {totalPrice()}</h3>
                                </div>
                                {!clientToken || !auth?.token || !products?.length ? (
                                    ""
                                ) : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />


                                        <button
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ...." : "Chekout"}<HiArrowLongRight className="arrow_icon" />
                                        </button>
                                    </>
                                )}
                            </div>


                        </section>
                    </>
                    :
                    <>
                        <section className="empty_cart_container">
                            <span className="empty_cart"><RiShoppingBag2Fill className="empty_cart_icon" /></span>
                            <h1>Your cart is empty!</h1>
                            <button onClick={() => navigate('/products')}>Continue Shopping</button>
                        </section>
                    </>
            }
            <Toaster />

        </Layout>
    </>
};


export default Cart;