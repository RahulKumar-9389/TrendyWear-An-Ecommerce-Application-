import React, { useState } from 'react'
import AdminMenu from '../../components/AdminMenu';
import AdminNavbar from '../../components/AdminNavbar';
import Widget from '../../components/Widget';
import Charts from '../../components/Charts';

const AdminDashboard = () => {

    const [showMenu, setShowMenu] = useState(false)

    return <>
        <section className="admin_dashboard_wrapper">

            <div className="left" style={{ left: showMenu ? '0px' : '-300px' }}>
                <AdminMenu />
            </div>
            <div className="right">
                <AdminNavbar showMenu={showMenu} setShowMenu={setShowMenu} />
                <Widget />
                <Charts />
            </div>

        </section>
    </>
}

export default AdminDashboard;