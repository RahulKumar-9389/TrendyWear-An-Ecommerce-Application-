import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { CgUser } from "react-icons/cg";
import { BiListUl } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/authSlice';
import axios from 'axios';

const Profile = () => {

    const { pathname } = window.location;
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
                navigate('/dashboard/user')
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // logout 
    const handleLogout = (e) => {
        e.preventDefault()
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


                    <Link to='/dashboard/user' className={pathname === '/dashboard/user' ? 'active_link' : ''}>
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
        </Layout>
    </>
};

export default Profile;