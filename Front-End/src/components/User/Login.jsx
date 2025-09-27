import TextField from '@mui/material/TextField';
import {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { clearErrors, loginUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layout/BackdropLoader';
import MetaData from '../Layout/MetaData';
import { loginwithPassword } from '@/Redux/AuthSlice';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    // const location = useLocation();

    const { isLoading } = useSelector((state) => state.auth);

    // const login={}
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const fromData={
        email,
        password
    }
  
    

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginwithPassword(fromData))
        .then((data) => {
          if (data?.payload?.success) {
            enqueueSnackbar(data.payload.message || "Login successful!", { variant: "success" });
            // ✅ Reset the Form After Successful Registration
            setEmail("");
            navigate("/")
          } else {
            enqueueSnackbar(data.payload?.message || "Login failed!", { variant: "error" });
          }
          console.log(data.payload);
        })
        .catch((error) => {
          console.error("Registration Error:", error.message);
          enqueueSnackbar(error.message || "Something went wrong!", { variant: "error" });
        });
    }



   

    return (
        <>
            <MetaData title="Login | Flipkart" />

            {isLoading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    {/* <!-- sidebar column  --> */}
                    <div className="loginSidebar bg-blue-600 p-10 pr-12 hidden sm:flex flex-col gap-4 w-2/5">
                        <h1 className="font-medium text-white text-3xl">Login</h1>
                        <p className="text-gray-200 text-lg">Get access to your Orders, Wishlist and Recommendations</p>
                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">

                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">

                            {/* <!-- input container --> */}
                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col w-full gap-4">

                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {/* <span className="text-xxs text-red-500 font-medium text-left mt-0.5">Please enter valid Email ID/Mobile number</span> */}

                                    {/* <!-- button container --> */}
                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <p className="text-xs text-grey-400 text-left">By continuing, you agree to Flipkart's <a href="https://www.flipkart.com/pages/terms" className="text-primary-blue"> Terms of Use</a> and <a href="https://www.flipkart.com/pages/privacypolicy" className="text-blue-600"> Privacy Policy.</a></p>
                                        <button type="submit" className="text-white py-3 w-full bg-orange-600 shadow hover:shadow-lg rounded-sm font-medium">Login</button>
                                        <Link to="/password/forgot" className="hover:bg-gray-50 text-blue-600 text-center py-3 w-full shadow border rounded-sm font-medium">Forgot Password?</Link>
                                    </div>
                                    {/* <!-- button container --> */}

                                </div>
                            </form>
                            {/* <!-- input container --> */}

                            <Link to="/register" className="font-medium text-sm text-blue-600">New to Flipkart? Create an account</Link>
                        </div>
                        {/* <!-- edit info container --> */}

                    </div>
                    {/* <!-- login column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default Login;
