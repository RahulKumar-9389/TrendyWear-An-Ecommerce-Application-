import React from 'react'
import { RxDashboard } from "react-icons/rx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const Categories = () => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return <>
        <section className="categories_container">

            <div className="category_heading">
                <RxDashboard className='category_icon' />
                <h1>Categories</h1>
            </div>

            <Carousel responsive={responsive} showDots={false} arrows={false} infinite={true} autoPlay={true}>

                <Link to='/products'>
                    <div className='category'>
                        <img src="/shirt.png" alt="shirt" loading='lazy' />
                        <p>Shirt</p>
                    </div>
                </Link>

                <Link to='/products'>
                    <div className='category'>
                        <img src="/shoe.png" alt="shoe" loading='lazy' />
                        <p>Shoes</p>
                    </div>
                </Link>

                <Link to='/products'>
                    <div className='category'>
                        <img src="/tshirt.png" alt="tshirt" loading='lazy' />
                        <p>Tshirt</p>
                    </div>
                </Link>

                <Link to='/products'>
                    <div className='category'>
                        <img src="/watch.png" alt="watch" loading='lazy' />
                        <p>Watches</p>
                    </div>
                </Link>

            </Carousel>
        </section>
    </>
};

export default Categories