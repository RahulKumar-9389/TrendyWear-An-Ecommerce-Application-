import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { searchProduct } from '../redux/searchSlice';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Banner = () => {

    const [values, setValues] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://trendywear.onrender.com/api/v1/product/search/${values}`
            );
            dispatch(searchProduct({
                keyword: values,
                result: data?.product
            }))
            navigate('/search')
        } catch (error) {
            console.log(error.message);
        }
    }


    return <>
        <section id="banner">
            <h1>All the assets you need, in one place</h1>
            <p>Shop clothes, accessories, and more from independent sellers around the world.</p>
            <div className="search_box">
                <input
                    type="text"
                    placeholder="Search.."
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                />
                <span onClick={handleSearch}><IoSearch className="search_icon" /></span>
            </div>
        </section>
    </>
};

export default Banner;