import React from 'react';
import { MdOutlineFormatListBulleted, MdOutlineSpaceDashboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { CgUser } from "react-icons/cg";
import { BiCollection } from "react-icons/bi";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';


const AdminMenu = () => {

    const { pathname } = window.location;
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        <section className="admin_menu_container">

            <div className="logo" onClick={() => navigate('/')} style={{ cursor: "pointer" }}>
                <img src="/logo.png" alt="TrendyWear" />
            </div>

            <menu>
                <Link
                    className={pathname === '/dashboard/admin' ? 'active_link' : ''}
                    to='/dashboard/admin'
                >
                    <MdOutlineSpaceDashboard className='admin_icon' />
                    <p>Dashboard</p>
                </Link>

                <Link
                    className={pathname === '/dashboard/admin/orders' ? 'active_link' : ''}
                    to='/dashboard/admin/orders'
                >
                    <MdOutlineFormatListBulleted className='admin_icon' />
                    <p>Orders</p>
                </Link>

                <Link
                    className={pathname === '/dashboard/admin/profile' ? 'active_link' : ''}
                    to='/dashboard/admin/profile'
                >
                    <CgUser className='admin_icon' fontSize={`23px`} />
                    <p>Profile</p>
                </Link>

                <Link
                    className={pathname === '/dashboard/admin/products' ? 'active_link' : ''}
                    to='/dashboard/admin/products'
                >
                    <BiCollection className='admin_icon' />
                    <p>Products</p>
                </Link>

                <Link onClick={handleLogout}>
                    <BiLogInCircle className='admin_icon' />
                    <p>Logout</p>
                </Link>

            </menu>

        </section>
    </>
}

export default AdminMenu;