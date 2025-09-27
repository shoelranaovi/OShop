
import { Outlet } from "react-router-dom";


import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUser } from "./Redux/AuthSlice";

function App() {
const dispatch=useDispatch()

useEffect(() => {
  const verifyUser = async () => {
    try {
      const data = await dispatch(checkUser()).unwrap();
      if (data.success) {
        console.log("User reactivated successfully");
      } else {
        console.log("User reactivation failed");
      }
    } catch (error) {
      console.error("User verification failed:", error);
    }
  };

  verifyUser();
}, [dispatch]);




  return (
    <div className="w-full h-full bg-gray-100">
       <ToastContainer />
       <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
