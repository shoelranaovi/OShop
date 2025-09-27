import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import Dashboard from "./components/Admin/Dashboard";
import MainData from "./components/Admin/MainData";
import OrderTable from "./components/Admin/OrderTable";
import UpdateOrder from "./components/Admin/UpdateOrder";
import ProductTable from "./components/Admin/ProductTable";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import UserTable from "./components/Admin/UserTable";
import UpdateUser from "./components/Admin/UpdateUser";
import ReviewsTable from "./components/Admin/ReviewsTable";
import NotFound from "./components/NotFound";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Products from "./components/Products/Products";
import Shipping from "./components/Cart/Shipping";
import OrderConfirm from "./components/Cart/OrderConfirm";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import OrderStatus from "./components/Cart/OrderStatus";
import OrderDetails from "./components/Order/OrderDetails";
import Account from "./components/User/Account";
import UpdateProfile from "./components/User/UpdateProfile";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Wishlist from "./components/Wishlist/Wishlist";
import MyOrders from "./components/Order/MyOrders";
import UpdatePassword from "./components/User/UpdatePassword";

export const route = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [],
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "shipping", element: <Shipping /> },
      { path: "order/confirm", element: <OrderConfirm /> },
      { path: "/process/payment", element: <Payment /> },
      { path: "/orders/success", element: <OrderSuccess success={true} /> },
      { path: "/order/:id", element: <OrderStatus /> },
      { path: "/orders", element: <MyOrders /> },
      { path: "/order_details/:id", element: <OrderDetails /> },
      { path: "account", element: <Account /> },
      { path: "account/update", element: <UpdateProfile /> },
      { path: "password/update", element: <UpdatePassword /> },
      { path: "password/forgot", element: <ForgotPassword /> },
      { path: "password/reset", element: <ResetPassword /> },
      { path: "wishlist", element: <Wishlist /> },
      {
        path: "/admin",
        element: <Dashboard />,
        children: [
          { path: "dashboard", element: <MainData /> },
          { path: "orders", element: <OrderTable /> },
          { path: "order/:id", element: <UpdateOrder /> },
          { path: "products", element: <ProductTable /> },
          { path: "new_product", element: <NewProduct /> },
          { path: "product/:id", element: <UpdateProduct /> },
          { path: "users", element: <UserTable /> },
          { path: "user/:id", element: <UpdateUser /> },
          { path: "reviews", element: <ReviewsTable /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
