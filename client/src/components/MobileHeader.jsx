import React from 'react'
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../redux/authSlice';
import { BiHome, BiListUl, BiLogInCircle, BiSolidDashboard, BiSolidShoppingBags, BiSolidUserDetail } from "react-icons/bi";

const MobileHeader = ({ setShowMobileHeader }) => {

    const { pathname } = window.location;
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart.cart)
    const auth = useSelector((state) => state.auth);

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
        <section className="mobile_header">
            <div className="upper">
                <div className="logo">
                    <img src="/logo.png" alt="TrendyWear" />
                </div>
                <BsArrowRight className='close_mobile_header' onClick={() => setShowMobileHeader(false)} />
            </div>

            <menu className="mobile_menu">

                <Link
                    className={pathname === '/' ? 'active_link' : ''}
                    to={`/`}
                >
                    <BiHome className='mobile_icon' />
                    <p>Home</p>
                </Link>

                <Link
                    className={pathname === '/about' ? 'active_link' : ''}
                    to={`/about`}
                >
                    <BiSolidUserDetail className='mobile_icon' />
                    <p>About</p>
                </Link>

                <Link
                    className={pathname === '/products' ? 'active_link' : ''}
                    to={`/products`}
                >
                    <BiListUl className='mobile_icon' />
                    <p>Products</p>
                </Link>

                <Link
                    className={pathname === '/cart' ? 'active_link' : ''}
                    to={`/cart`}
                >
                    <BiSolidShoppingBags className='mobile_icon' />
                    <p>Cart ({products?.length})</p>
                </Link>

                {
                    auth?.user ?
                        <>
                            <Link
                                className={pathname === '/dashboard/user' ? 'active_link' : ''}
                                to={auth?.user.role === 1 ? '/dashboard/admin' : '/dashboard/user'}
                            >
                                <BiSolidDashboard className='mobile_icon' />
                                <p>Dashboard</p>
                            </Link>
                            <Link onClick={handleLogout}>
                                <BiLogInCircle className='mobile_icon' />
                                <p>Logout</p>
                            </Link>
                        </>
                        :
                        <Link
                            className={pathname === '/login' ? 'active_link' : ''}
                            to='/login'
                        >
                            <BiLogInCircle className='mobile_icon' />
                            <p>Login</p>
                        </Link>
                }

            </menu>
        </section>
    </>
};

export default MobileHeader