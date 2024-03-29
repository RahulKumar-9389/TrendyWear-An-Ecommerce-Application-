import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { IoMdLogIn } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://trendywear.onrender.com/api/v1/auth/login", {
                email,
                password
            });
            if (data && data.success) {
                dispatch(login({
                    user: data.user,
                    token: data.token
                }))
                toast.success("Login successfully", {
                    className: 'toast'
                })
                navigate('/')
            }
            else {
                toast.error(data.message, {
                    className: 'toast',
                });
            }
        } catch (error) {
            toast.error(error.message, {
                className: 'toast',
            });
        }
    }

    return <>
        <Layout title="Login">
            <section id="register">

                <div className="left">
                    <div className="logo">
                        <img src="/logo.png" alt="trendywear" />
                    </div>
                    <p>TrendyWear is the best online shopping store.</p>
                    <p>We have a wide range of products; from</p>
                    <p>fashion items to electronic devices. start</p>
                    <button onClick={() => navigate('/register')}>SIGN UP</button>
                </div>
                <div className="right">
                    <form method="post" onSubmit={handleSubmit}>

                        <div className="form_heading">
                            <h1>Welcome Back</h1>
                            <p>Welcome back! Please login to your account</p>
                        </div>


                        <div className="input_box">
                            <input
                                type="email"
                                required
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                inputMode='email'
                            />
                        </div>


                        <div className="input_box">
                            <input
                                type="password"
                                required
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button>LOGIN <IoMdLogIn className='form_icon' /></button>


                    </form>
                </div>

            </section>
            <Toaster />
        </Layout>
    </>
};

export default Login;