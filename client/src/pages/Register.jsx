import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { IoMdLogIn } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://trendywear.onrender.com/api/v1/auth/register", {
                name,
                email,
                address,
                password
            });
            if (data && data.success) {
                toast.success("Register successfully", {
                    className: 'toast'
                })
                navigate('/login')
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
        <Layout title="Register">
            <section id="register">

                <div className="left">
                    <div className="logo">
                        <img src="/logo.png" alt="trendywear" />
                    </div>
                    <p>Welcome back in TrendyWear. We offer the</p>
                    <p>best prices and we deliver to your doorstep.</p>
                    <p>What are you waiting for? Start shopping now!</p>
                    <button onClick={() => navigate('/login')}>LOGIN</button>
                </div>
                <div className="right">
                    <form method="post" onSubmit={handleSubmit}>

                        <div className="form_heading">
                            <h1>Create an Account</h1>
                            <p>Please fill in the form below to create an account</p>
                        </div>

                        <div className="input_box">
                            <input
                                type="text"
                                required
                                placeholder='Username'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
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
                                type="text"
                                required
                                placeholder='Address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                inputMode='numeric'
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

                        <button>SIGN UP <IoMdLogIn className='form_icon' /></button>


                    </form>
                </div>

            </section>
            <Toaster />
        </Layout>
    </>
};

export default Register;