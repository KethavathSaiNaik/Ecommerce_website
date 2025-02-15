import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Forgetpassword from "./pages/Auth/Forgetpassword";
import PrivateRoute from "./components/Routes/Private";
import Dashboard from "./pages/user/Dashboard";
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboard from "./pages/admin/AdminDashboard"
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "../src/pages/Search";
import ProductDetails from "../src/pages/ProductDetails"
import Categories from "../src/pages/Categories";
import CategoryProduct from "../src/pages/CategoryProduct";
import CartPage from "./pages/CartPage"
import AdminOrders from "./pages/admin/AdminOrders";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    <>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/forgot-password" element={<Forgetpassword />} />
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="Order-success" element={<OrderSuccess />} />

        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />

        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
