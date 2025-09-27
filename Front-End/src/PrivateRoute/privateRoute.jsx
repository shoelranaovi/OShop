/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function AuthenticationRoute({ children }) {
  const { isAuthenticate } = useSelector((state) => state.auth);
  const location = useLocation();

  // আনঅথরাইজড ইউজারদের জন্য লগইন পেজে রিডিরেক্ট
  if (!isAuthenticate && !location.pathname.startsWith("/auth")) {
    console.log("Redirecting to login page");

    return <Navigate to="/auth/login" replace />;
  }

  // অথরাইজড ইউজারদের জন্য লগইন এবং রেজিস্টার পেজ থেকে হোমপেজে রিডিরেক্ট
  if (isAuthenticate && location.pathname.includes("auth")) {
    console.log("Redirecting to home page");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthenticationRoute;
