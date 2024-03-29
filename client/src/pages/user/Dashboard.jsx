import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { CgUser } from "react-icons/cg";
import { BiListUl } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../../redux/authSlice';

const Dashboard = () => {

    const { pathname } = window.location;
    const [orders, setOrders] = useState([]);
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get orders
    const getOrders = async () => {
        try {
            const { data } = await axios.get("https://trendywear.onrender.com/api/v1/auth/orders",
                { headers: { "Authorization": auth?.token } });
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);


    // logout 
    const handleLogout = (e) => {
        e.preventDefault();
        const confirm = window.confirm("You will be logout.")
        if (confirm) {
            dispatch(logout())
            navigate('/login')
        }
        else {
            return
        }
    }


    return <>
        <Layout title="Dashboard">
            <section className="user_dashboard_container">

                <div className="user_actions">


                    <Link className={pathname === '/dashboard/user' ? 'active_link' : ''}>
                        <BiListUl className='user_action_icon' fontSize={'22px'} />
                        <p>Orders</p>
                    </Link>

                    <Link to='/dashboard/user/update-profile' className={pathname === '/dashboard/user/update-profile' ? 'active_link' : ''}>
                        <CgUser className='user_action_icon' fontSize={'26px'} />
                        <p>Update Profile</p>
                    </Link>

                    <Link onClick={handleLogout}>
                        <IoMdLogOut className='user_action_icon' fontSize={'20px'} />
                        <p>Logout</p>
                    </Link>

                </div>

                <div className="user_actions_container">
                    <div className="orders_container">
                        {
                            orders.length > 0 ?
                                <>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Buyer</th>
                                                <th>Status</th>
                                                <th>Payment</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders.map((o, i) => {
                                                    return <tr key={i}>
                                                        <td aria-label='ID'>{o?._id}</td>
                                                        <td aria-label='BUYER'>{o?.buyer.name}</td>
                                                        <td aria-label='STATUS'>{o?.status}</td>
                                                        <td aria-label='PAYMENT'>
                                                            {o?.payment?.success ? <><p className="success">Success</p></> : <><p className="failed">Failed</p></>}
                                                        </td>
                                                        <td aria-label='QUANTITY'>{o?.products?.length}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </>
                                :
                                <>
                                    <div className="no_orders_container">
                                        <h1>No order found!</h1>
                                        <button>Shop Now</button>
                                    </div>
                                </>
                        }
                    </div>
                </div>

            </section>
        </Layout>
    </>
};

export default Dashboard;