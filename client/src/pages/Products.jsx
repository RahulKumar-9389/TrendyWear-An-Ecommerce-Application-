import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useEffect } from 'react';
import { IoMdNuclear } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { BsFillFilterCircleFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [sort, setSort] = useState('oldest');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [showMobileFilters, setShowMobileFilters] = useState(false)

    const navigate = useNavigate();

    // get products
    const getProducts = async () => {
        try {
            setError(false)
            setLoading(true)
            const { data } = await axios.get(
                `https://trendywear.onrender.com/api/v1/product/products?sort=${sort}&category=${category}&price=${price}`
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


    // get categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get("https://trendywear.onrender.com/api/v1/product/categories");
            if (data && data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProducts()
    }, [sort, category, price])

    useEffect(() => {
        getCategories()
    }, [])

    const clearFilter = () => {
        window.location.reload()
    }


    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 6;
    const lastIndex = recordPerPage * currentPage;
    const firstIndex = lastIndex - recordPerPage;
    const pages = Math.ceil(products.length / recordPerPage);
    const numbers = [...Array(pages + 1).keys()].slice(1);


    const changePage = (n) => {
        setCurrentPage(n)
    }

    const prePage = () => {
        if (currentPage === 1) return currentPage
        setCurrentPage(currentPage - 1)
    }

    const nextPage = () => {
        if (currentPage === Number(pages)) return currentPage
        setCurrentPage(currentPage + 1)
    }



    return <>
        <Layout title="Products">
            <div className="product_heading">
                <h1>Our Trending Collection</h1>
            </div>

            <BsFillFilterCircleFill className='filter_icon' onClick={() => setShowMobileFilters(true)} />

            <section id="products">

                <div className="filters_container">

                    <div className="sort_container">

                        <h2>Published</h2>
                        <label htmlFor="latest">
                            <input type="radio" name='sort' id='latest' value='latest' onChange={(e) => setSort(e.target.value)} />
                            Newest - Oldest
                        </label><br />
                        <label htmlFor="oldest">
                            <input type="radio" name='sort' id='oldest' value='oldest' onChange={(e) => setSort(e.target.value)} />
                            Oldest - Newest
                        </label>

                    </div>

                    <div className="category_container">
                        <h2>Categories</h2>
                        {
                            categories.map((c, i) => {
                                return <>
                                    <label htmlFor={c}>
                                        <input type="radio" name='category' id={c} value={c} onChange={(e) => setCategory(e.target.value)} />
                                        {c}
                                    </label><br />
                                </>
                            })
                        }
                    </div>

                    <div className="price_container">
                        <h2>Price</h2>
                        <input
                            type="range"
                            min={`100`}
                            max={`1000`}
                            step={`100`}
                            onChange={(e) => setPrice(e.target.value)}
                        /> <br /><label>{price}</label>
                    </div>

                    <button onClick={clearFilter}>Clear Filter <IoMdNuclear className='clear_icon' /></button>

                </div>

                <div className="products_container">
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
                                    products.slice(firstIndex, lastIndex).map((p, i) => {
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

            {
                products.length > 6 ?
                    <>
                        <div className="pagination">
                            <button
                                onClick={prePage}
                                className={currentPage === 1 ? 'disable_btn' : 'btn'}
                            >pre</button>
                            {
                                numbers.map((n, i) => {
                                    return <button
                                        key={i}
                                        onClick={() => changePage(n)}
                                        className={currentPage === n ? 'active_btn' : 'btn'}
                                    >{n}</button>
                                })
                            }
                            <button
                                onClick={nextPage}
                                className={currentPage === Number(pages) ? 'disable_btn last' : 'btn last'}
                            >next</button>
                        </div>
                    </>
                    :
                    <></>
            }

            <section className="mobile_filters_container" style={{ display: showMobileFilters ? 'flex' : 'none' }}>
                <div className="mobile_filters">
                    <div className="logo">
                        <img src="/logo.png" alt="TrendyWear" />
                        <span onClick={() => setShowMobileFilters(false)} className="close_filter"><MdClose className='close_filter_icon' /></span>
                    </div>
                    <div className="filters_container">

                        <div className="sort_container">

                            <h2>Published</h2>
                            <label htmlFor="mlatest">
                                <input type="radio" name='sort' id='mlatest' value='latest' onChange={(e) => setSort(e.target.value)} />
                                Newest - Oldest
                            </label><br />
                            <label htmlFor="moldest">
                                <input type="radio" name='sort' id='moldest' value='oldest' onChange={(e) => setSort(e.target.value)} />
                                Oldest - Newest
                            </label>

                        </div>

                        <div className="category_container">
                            <h2>Categories</h2>
                            {
                                categories.map((c, i) => {
                                    return <>
                                        <label htmlFor={`m${c}`}>
                                            <input type="radio" name='category' id={`m${c}`} value={c} onChange={(e) => setCategory(e.target.value)} />
                                            {c}
                                        </label><br />
                                    </>
                                })
                            }
                        </div>

                        <div className="price_container">
                            <h2>Price</h2>
                            <input
                                type="range"
                                min={`100`}
                                max={`1000`}
                                step={`100`}
                                onChange={(e) => setPrice(e.target.value)}
                            /> <br /><label>{price}</label>
                        </div>

                        <button onClick={clearFilter}>Clear Filter <IoMdNuclear className='clear_icon' /></button>
                    </div>
                </div>
            </section>


        </Layout>
    </>
};

export default Products;