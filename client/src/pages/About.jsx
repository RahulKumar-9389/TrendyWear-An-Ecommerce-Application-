import React from 'react'
import Layout from '../components/Layout/Layout';
import { MdOutlineDiscount, MdOutlineTask } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";

const About = () => {
    return <>
        <Layout title="About">
            <section className="about_container">
                <h1>About Us</h1>

                <div className="about_details">
                    <div className="left">
                        <img src="/about.jpg" alt="about us" />
                    </div>
                    <div className="right">
                        <h2><span>TrendyWear</span> The future of fashion</h2>
                        <p><span></span>TrendyWear is a collection of trending clothes.</p>
                        <p><span></span>TrendyWear provide best offers and <MdOutlineDiscount className="about_icon" /> discount.</p>
                        <p><span></span>Fast Delivery product deliver within 2days.</p>
                        <p><span></span>Money return policy.</p>
                        <p><span></span>Customer support, 24/7  <RiCustomerService2Fill className="about_icon" /> customer support available.</p>
                        <p><span></span>Latest and trending products.</p>
                    </div>
                </div>
            </section>
        </Layout>
    </>
};

export default About