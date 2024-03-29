import React from 'react'
import { LuMenu } from "react-icons/lu";
import { MdLanguage } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const AdminNavbar = ({ showMenu, setShowMenu }) => {

    const navigate = useNavigate()

    return <>
        <nav className='admin_navbar'>

            <div>
                <button
                    onClick={() => navigate('/dashboard/admin/add-product')}
                    className='add_product_btn'><MdAdd className='add_icon' /></button>
            </div>

            <div className='language_container'>
                <MdLanguage className='language_icon' />
                <p>INDIA</p>
            </div>


            <div className='menu_icon_container'>
                <LuMenu className='mobile_menu_icon' onClick={() => setShowMenu(!showMenu)} />
            </div>
        </nav>
    </>
}

export default AdminNavbar