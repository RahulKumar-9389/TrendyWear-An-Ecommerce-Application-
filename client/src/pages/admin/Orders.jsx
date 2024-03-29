import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu';
import AdminNavbar from '../../components/AdminNavbar';
import { useSelector } from "react-redux";
import axios from 'axios';
import Loader from '../../components/Loader';

const Orders = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(false);

    const [status,] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "Deliverd",
        "Cancel",
    ]);
    const [orders, setOrders] = useState([]);
    const auth = useSelector((state) => state.auth)

    const getOrders = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("https://trendywear.onrender.com/api/v1/auth/all-orders",
                { headers: { "Authorization": auth?.token } });
            setOrders(data);
            setLoading(false)
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    };


    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);




    const handleChange = async (orderId, value) => {
        try {
            await axios.put(`https://trendywear.onrender.com/api/v1/auth/order-status/${orderId}`, {
                status: value,
            },
                { headers: { "Authorization": auth?.token } });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };


    return <>
        <section className="admin_dashboard_wrapper">

            <div className="left" style={{ left: showMenu ? '0px' : '-300px' }}>
                <AdminMenu />
            </div>
            <div className="right">
                <AdminNavbar showMenu={showMenu} setShowMenu={setShowMenu} />

                <section className="admin_orders_table">

                    {
                        loading ?
                            <>
                                <section id="loading">
                                    <Loader />
                                </section>
                            </>
                            :
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>STATUS</th>
                                            <th>BUYER</th>
                                            <th>DATE</th>
                                            <th>PAYMENT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((o, i) => {
                                                return <tr key={i}>
                                                    <td aria-label='ID'>{o._id}</td>
                                                    <td aria-label='STATUS'>
                                                        <select
                                                            onChange={(value) => handleChange(o._id, value)}
                                                            defaultValue={o?.status}
                                                        >
                                                            {status.map((s, i) => (
                                                                <option key={i} value={s}>
                                                                    {s}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td aria-label='BUYER'>{o?.buyer?.name}</td>
                                                    <td aria-label='DATE'>{o.createdAt.toString()}</td>
                                                    <td aria-label='PAYMENT'>{o?.payment?.success ? <p className='success'>success</p> : <p className='failed'>failed</p>}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </>
                    }

                </section>
            </div>

        </section>
    </>
}

export default Orders;