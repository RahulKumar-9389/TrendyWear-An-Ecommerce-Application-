import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from '../components/Loader';

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const auth = useSelector((state) => state.auth)

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("https://trendywear.onrender.com/api/v1/auth/admin-auth",
                { headers: { "Authorization": auth.token } });
            if (res.data === 'ok') {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <>
        <section id="loading"><Loader /></section>
    </>;
};