import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import Loader from '../components/Loader'

const SingleProduct = () => {

    const { slug } = useParams();
    const [product, setProduct] = useState([])
    const [active, setActive] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const dispatch = useDispatch();

    const sizes = ['XL', 'L', 'M', 'S', 'XXL']

    // get product
    const getProduct = async () => {
        try {
            setLoading(true)
            setError(false)
            const { data } = await axios.get(`https://trendywear.onrender.com/api/v1/product/product/${slug}`);
            if (data && data.success) {
                setProduct(data.product)
                setLoading(false)
            }
        } catch (error) {
            console.log(error.message);
            setError(true)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const handleAddToCart = (p) => {
        if (!active) {
            return toast.error('Size is required', {
                className: "toast"
            })
        }
        dispatch(addItem(p))
        toast.success("Product added to cart", {
            className: 'toast'
        })
    }

    if (error) {
        return <>
            <Layout title="Product-Details">
                <section id="error">
                    <h1>Something went wrong!</h1>
                </section>
            </Layout>
        </>
    }

    if (loading) {
        return <>
            <Layout title="Product-Details">
                <section id="loading">
                    <Loader />
                </section>
            </Layout>
        </>
    }

    return <>
        <Layout title="Product-Details">
            <section className="single_product_container">

                <div className="img_container">
                    <img src={product?.photo} alt={product.name} />
                </div>

                <div className="product_details">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <h2>₹ {product.price}</h2>
                    <h3>Choose Size:</h3>
                    <div className="sizes">
                        {
                            sizes.map((s, i) => {
                                return <span
                                    key={i}
                                    className={active === s ? 'active_size' : 'size'}
                                    onClick={() => setActive(s)}
                                >{s}</span>
                            })
                        }
                    </div>
                    <button onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                </div>

            </section>
            <Toaster />
        </Layout>
    </>
};

export default SingleProduct;