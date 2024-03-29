import React from 'react'
import { GoArrowUpRight, GoGraph } from "react-icons/go";
import { GiTakeMyMoney } from "react-icons/gi";
import { LuUsers } from "react-icons/lu";

const Widget = () => {
    return <>
        <section className="widget_container">
            <div>
                <GoGraph className='widget_icon' />
                <h3>Weekly Sales</h3>
                <h1>₹ 15,0000</h1>
                <p>Increased by 60% <GoArrowUpRight /></p>
            </div>
            <div>
                <GiTakeMyMoney className='widget_icon' />
                <h3>Weekly Orders</h3>
                <h1>45,6334</h1>
                <p>Increased by 10% <GoArrowUpRight /></p>
            </div>
            <div>
                <LuUsers className='widget_icon' />
                <h3>Visitors Online</h3>
                <h1>9,0000</h1>
                <p>Increased by 5% <GoArrowUpRight /></p>
            </div>
        </section>
    </>
}

export default Widget