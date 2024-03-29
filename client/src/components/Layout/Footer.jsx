import React from 'react'
import { LuMapPin } from "react-icons/lu";
import { MdCall, MdOutlineMail } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {

    const user = useSelector((state) => state.auth.user);

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
        <footer id="footer">

            <div className="col1">

                <div className="logo">
                    <img src="/logo.png" alt="TrendyWear" />
                </div>

                <span>
                    <LuMapPin className='footer_icon' />
                    <p>Himayupur Mawana Meerut (Uttar Pardesh), India</p>
                </span>

                <span>
                    <MdCall className='footer_icon' />
                    <p>(+91) 123456789</p>
                </span>

                <span>
                    <MdOutlineMail className='footer_icon' />
                    <p>rahulkumar.programmer@gmail.com</p>
                </span>

            </div>

            <div className="col2">
                <h2>Company</h2>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/products'>Products</Link>
                <Link to='/about'>Contact</Link>
            </div>

            <div className="col3">
                <h2>My Account</h2>
                <Link to={user ? user.role === 1 ? '/dashboard/admin' : 'dashboard/user' : '/login'}>My Profile</Link>
                <Link to={user ? user.role === 1 ? '/dashboard/admin' : 'dashboard/user' : '/login'}>Dashboard</Link>
                <Link to={user ? user.role === 1 ? '/dashboard/admin' : 'dashboard/user' : '/login'}>Orders</Link>
                <Link onClick={handleLogout}>Logout</Link>
            </div>

        </footer>
    </>
};

export default Footer;