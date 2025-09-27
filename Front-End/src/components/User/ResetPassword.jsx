import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { resetPassword, clearErrors } from '../../actions/userAction';
import { useSnackbar } from "notistack";
import BackdropLoader from "../Layout/BackdropLoader";
import MetaData from "../Layout/MetaData";
import FormSidebar from "./FormSidebar";
import { resetPass } from "@/Redux/AuthSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading } = useSelector((state) => state.auth);
  const loading = false;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  console.log(newPassword, confirmPassword);
  console.log(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      enqueueSnackbar("Password length must be atleast 8 characters", {
        variant: "warning",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Password Doesn't Match", { variant: "error" });
      return;
    }

    const formData = {
      email,
      confirmPassword,
    };
    dispatch(resetPass(formData))
      .then((result) => {
        if (result.payload.success) {
          enqueueSnackbar(result.payload.message, {
            variant: "success",
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          enqueueSnackbar(result.payload.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      });
  };

  return (
    <>
      <MetaData title="Password Reset | Flipkart" />

      {isLoading && <BackdropLoader />}
      <main className="w-full mt-12 sm:pt-20 sm:mt-0">
        {/* <!-- row --> */}
        <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
          <FormSidebar
            title="Reset Password"
            tag="Get access to your Orders, Wishlist and Recommendations"
          />

          {/* <!-- login column --> */}
          <div className="flex-1 overflow-hidden">
            <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">
              Reset Password
            </h2>

            {/* <!-- edit info container --> */}
            <div className="text-center py-10 px-4 sm:px-14">
              {/* <!-- input container --> */}
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-4">
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  {/* <!-- button container --> */}
                  <div className="flex flex-col gap-2.5 mt-2 mb-32">
                    <p className="text-xs text-primary-grey text-left">
                      By continuing, you agree to Flipkart's{" "}
                      <a
                        href="https://www.flipkart.com/pages/terms"
                        className="text-primary-blue">
                        {" "}
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://www.flipkart.com/pages/privacypolicy"
                        className="text-primary-blue">
                        {" "}
                        Privacy Policy.
                      </a>
                    </p>
                    <button
                      type="submit"
                      className="text-white py-3 w-full bg-orange-600 shadow hover:shadow-lg rounded-sm font-medium">
                      Submit
                    </button>
                  </div>
                  {/* <!-- button container --> */}
                </div>
              </form>
              {/* <!-- input container --> */}

              <Link to="/register" class="font-medium text-sm text-blue-600">
                New to Flipkart? Create an account
              </Link>
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

export default ResetPassword;
