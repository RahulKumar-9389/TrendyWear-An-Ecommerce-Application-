import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MdOutlineFormatListBulleted } from "react-icons/md";
import axios from 'axios';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const TopProducts = () => {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const navigate = useNavigate()


    // get products
    const getProducts = async () => {
        try {
            setError(false)
            setLoading(true)
            const { data } = await axios.get(
                `https://trendywear.onrender.com/api/v1/product/products`
            );
            if (data && data.success) {
                setProducts(data.products);
                setLoading(false)
            }
        } catch (error) {
            console.log(error.message);
            setError(true)
        }
    };

    useEffect(() => {
        getProducts()
    }, [])


    return <>
        <section className="top_products_wrapper">

            <div className="top_products_heading">
                <MdOutlineFormatListBulleted className='top_product_icon' />
                <h1>Top Products</h1>
            </div>
            <div className="top_products_container">
                {
                    loading ?
                        <>
                            <div id="loading">
                                <Loader />
                            </div>
                        </>
                        :
                        <>
                            {
                                products.slice(0, 6).map((p, i) => {
                                    return <div className="product_card" key={i} onClick={() => navigate(`/product/${p.slug}`)}>
                                        <div className="img_box">
                                            <img src={p.photo} alt={p.name} loading='lazy' />
                                        </div>
                                        <p>{p.name}</p>
                                        <h2>₹ {p.price}</h2>
                                    </div>
                                })
                            }
                        </>
                }
            </div>
        </section>
    </>
}

export default TopProducts