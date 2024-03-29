import Banner from '../components/Banner';
import Categories from '../components/Categories';
import Layout from '../components/Layout/Layout';
import TopProducts from '../components/TopProducts';

const Home = () => {
    return <>
        <Layout title="Home">
            <Banner />
            <Categories />
            <TopProducts />

            <section className="offer_wrapper">
                <div className='offer_container'>
                    <div className="offer_text">
                        <h1>Still looking for the best <span>Online Shopping Store?</span></h1>
                        <p>TrendyWear is the best online shopping store. We have a wide range of products; from fashion items to electronic devices, you can find anything you want on our online store. We offer the best prices and we deliver to your doorstep. What are you waiting for? Start shopping now!</p>
                        <button>GET STARTED</button>
                    </div>
                    <div className="img">
                        <img src="/shop.png" alt="loading.." loading='lazy' />
                    </div>
                </div>
            </section>

        </Layout>
    </>
};

export default Home;