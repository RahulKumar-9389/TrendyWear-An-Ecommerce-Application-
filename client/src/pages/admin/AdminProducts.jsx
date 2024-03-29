import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu';
import AdminNavbar from '../../components/AdminNavbar';
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';


const AdminProducts = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [products, setProducts] = useState([]);
    const auth = useSelector((state) => state.auth)

    // get products
    const getProducts = async () => {
        try {

            const { data } = await axios.get(
                `https://trendywear.onrender.com/api/v1/product/products`
            );
            if (data && data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error.message);

        }
    };


    useEffect(() => {
        getProducts()
    }, [])


    // DELETE PRODUCT 
    const deleteProduct = async (id) => {
        const { data } = await axios.delete(`https://trendywear.onrender.com/api/v1/product/delete-product/${id}`,
            { headers: { "Authorization": auth?.token } });
        if (data.success) {
            toast.success("Product deleted successfully!", {
                className: 'toast'
            })
            window.location.reload()
        }
        else {
            alert("Something went wrong");
        }
    }

    return <>
        <section className="admin_dashboard_wrapper">

            <div className="left" style={{ left: showMenu ? '0px' : '-300px' }}>
                <AdminMenu />
            </div>
            <div className="right">
                <AdminNavbar showMenu={showMenu} setShowMenu={setShowMenu} />

                <section className="admin_products_container">
                    <table>
                        <thead>
                            <tr>
                                <th>IMAGE</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((p, i) => {
                                    return <tr key={i}>
                                        <td aria-label='IMAGE'>
                                            <img src={p.photo} alt={p.name} />
                                        </td>
                                        <td aria-label='PRICE'>
                                            <h3>₹{p.price}</h3>
                                        </td>
                                        <td aria-label='CATEGORY'>{p.category}</td>
                                        <td aria-label='ACTIONS'>
                                            <AiOutlineDelete onClick={() => deleteProduct(p._id)} className='del_icon' />
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </section>

            </div>
            <Toaster />

        </section>
    </>
}

export default AdminProducts;