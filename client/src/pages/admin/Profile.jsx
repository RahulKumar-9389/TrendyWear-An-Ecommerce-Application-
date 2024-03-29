import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu';
import AdminNavbar from '../../components/AdminNavbar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';


const Profile = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)
    const token = useSelector((state) => state.auth.token)


    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setPassword(user.password)
        setAddress(user.address)
    }, [user])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`https://trendywear.onrender.com/api/v1/auth/update-profile/${user.id}`,
                {
                    name,
                    email,
                    password,
                    address
                },
                { headers: { 'Authorization': token } })
            if (data.success) {
                dispatch(login({
                    user: data?.user,
                    token: token
                }))
                alert("Profile Updated Successfully");
                navigate('/dashboard/admin')
            }
        } catch (error) {
            console.log(error.message);
        }
    }



    return <>
        <section className="admin_dashboard_wrapper">

            <div className="left" style={{ left: showMenu ? '0px' : '-300px' }}>
                <AdminMenu />
            </div>
            <div className="right">
                <AdminNavbar showMenu={showMenu} setShowMenu={setShowMenu} />

                <div className="user_profile_container">
                    <form method="post" onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder='Username'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />

                        <input
                            type="email"
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                        <br />

                        <input
                            type="password"
                            placeholder='Password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />

                        <input
                            type="text"
                            placeholder='Address'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <br />

                        <button type="submit">UPDATE</button>

                    </form>
                </div>

            </div>

        </section>
    </>
}

export default Profile;