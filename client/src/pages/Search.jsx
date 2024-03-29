import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCollection } from "react-icons/bs";
import Layout from "../components/Layout/Layout";

const Search = () => {

    const products = useSelector((state) => state.search)
    const navigate = useNavigate();

    return <>
        <Layout title='Search results'>
            <section id="search_page">
                {
                    products.result.length ?
                        <>
                            <div className="search_heading">
                                <BsCollection className="search_product_icon" />
                                <h1>{products.result.length} products found!</h1>
                            </div>
                            <section className="top_products_container">
                                {
                                    products?.result?.slice(0, 6).map((p, i) => {
                                        return <div className="product_card" key={i} onClick={() => navigate(`/product/${p.slug}`)}>
                                            <div className="img_box">
                                                <img src={p.photo} alt={p.name} loading='lazy' />
                                            </div>
                                            <p>{p.name}</p>
                                            <h2>₹ {p.price}</h2>
                                        </div>
                                    })
                                }
                            </section>
                        </>
                        :
                        <>
                            <section className="no_product_found">
                                <h1>No product found with this keyword!</h1>
                            </section>
                        </>
                }
            </section>
        </Layout>
    </>
};

export default Search;