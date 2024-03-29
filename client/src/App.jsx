import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";


const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const SingleProduct = lazy(() => import('./pages/SingleProduct'));
const Search = lazy(() => import('./pages/Search'));
const Cart = lazy(() => import('./pages/Cart'));
const PrivateRoute = lazy(() => import('./routes/PrivateRoute'));
const AdminRoute = lazy(() => import('./routes/AdminRoute'));
const Dashboard = lazy(() => import('./pages/user/Dashboard'))
const Profile = lazy(() => import('./pages/user/Profile'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Orders = lazy(() => import('./pages/admin/Orders'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AddProduct = lazy(() => import('./pages/admin/AddProduct'));
const AdminProfile = lazy(() => import('./pages/admin/Profile'));
import Loader from "./components/Loader";



const App = () => {
  return <>
    <Suspense fallback={<><section id="loading"><Loader /></section></>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/search" element={<Search />} />


        {/* <---------------- private routes ------------------> */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/update-profile" element={<Profile />} />
        </Route>


        {/* <---------------- admin routes ------------------> */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/add-product" element={<AddProduct />} />
          <Route path="admin/profile" element={<AdminProfile />} />
        </Route>

      </Routes>

    </Suspense>
  </>
};

export default App;