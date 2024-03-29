import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MobileHeader from "../MobileHeader";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CgMenuRight, CgUser } from "react-icons/cg";
import { useState } from "react";

const Header = () => {

    const navigate = useNavigate();
    const products = useSelector((state) => state.cart.cart)
    const auth = useSelector((state) => state.auth);
    const [showMobileHeader, setShowMobileHeader] = useState(false)

    return <>
        <header id="header">

            <div className="logo">
                <img src="/logo.png" alt="TrendyWear" />
            </div>

            <div className="mid_menu">
                <Link to="/">Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/products'>Products</Link>
            </div>

            <div className="right_menu">
                <CgUser
                    className={auth?.user ? 'right_menu_icon login' : 'right_menu_icon'}
                    onClick={() => navigate(auth?.user ? auth.user.role === 1 ? '/dashboard/admin' : '/dashboard/user' : '/login')}
                />
                <div onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
                    <span>{products.length}</span>
                    <HiOutlineShoppingBag className="right_menu_icon" />
                </div>
            </div>
            <CgMenuRight className="right_menu_icon showMenu" onClick={() => setShowMobileHeader(true)} />

        </header>
        {
            showMobileHeader && <MobileHeader setShowMobileHeader={setShowMobileHeader} />
        }
    </>
};

export default Header;