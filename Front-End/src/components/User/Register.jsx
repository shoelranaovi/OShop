import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackdropLoader from "../Layout/BackdropLoader";
import MetaData from "../Layout/MetaData";
import FormSidebar from "./FormSidebar";
import { register } from "../../Redux/AuthSlice";

const Register = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, isAuthenticated, error } = useSelector((state) => state.auth);
const navigate=useNavigate()

  const initialData = {
    name: "",
    email: "",
    gender: "male",
    password: "",
    cpassword: "",
  };

  const [user, setUser] = useState(initialData);

  const { name, email, gender, password, cpassword } = user;
  

  const [avatar, setAvatar] = useState();
  const [preview, setImgprev] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // ✅ Basic Validations Before Sending the Request
    if (password.length < 8) {
      enqueueSnackbar("Password length must be at least 8 characters", { variant: "warning" });
      return;
    }
    if (password !== cpassword) {
      enqueueSnackbar("Passwords do not match!", { variant: "error" });
      return;
    }
    if (!avatar) {
      enqueueSnackbar("Please select an avatar", { variant: "error" });
      return;
    }
  
    // ✅ Creating FormData Efficiently
    const formData = new FormData();
    Object.entries({ name, email, gender, password, avatar }).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    // ✅ Dispatching the Register Action & Handling Response
    dispatch(register(formData))
      .then((data) => {
        if (data?.payload?.success) {
          enqueueSnackbar(data.payload.message || "Registration successful!", { variant: "success" });
  
          // ✅ Reset the Form After Successful Registration
          setUser(initialData);
          setAvatar(null);
          setFileName("");
          setImgprev("");
          navigate("/login")
        } else {
          enqueueSnackbar(data.payload?.message || "Registration failed!", { variant: "error" });
        }
        console.log(data.payload);
      })
      .catch((error) => {
        console.error("Registration Error:", error.message);
        enqueueSnackbar(error.message || "Something went wrong!", { variant: "error" });
      });
  };
  
  const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result); // File data as Base64
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  };

  const handleDataChange = async (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setFileName(file.name);
      const dataurl = await readFileAsDataUrl(file);
      setImgprev(dataurl);
    }
  };


  return (
    <>
      <MetaData title="Register | Flipkart" />

      {isLoading && <BackdropLoader />}
      <main className="w-full mt-12 sm:pt-20 sm:mt-0">
        {/* <!-- row --> */}
        <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
          <FormSidebar
            title="Looks like you're new here!"
            tag="Sign up with your mobile number to get started"
          />

          {/* <!-- signup column --> */}
          <div className="flex-1 overflow-hidden">
            {/* <!-- personal info procedure container --> */}
            <form
              onSubmit={handleRegister}
              encType="multipart/form-data"
              className="p-5 sm:p-10">
              <div className="flex flex-col gap-4 items-start">
                {/* <!-- input container column --> */}
                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                  <TextField
                    fullWidth
                    id="full-name"
                    label="Full Name"
                    name="name"
                    value={name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
                  />
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    required
                  />
                </div>
                {/* <!-- input container column --> */}

                {/* <!-- gender input --> */}
                <div className="flex gap-4 items-center">
                  <h2 className="text-md">Your Gender :</h2>
                  <div className="flex items-center gap-6" id="radioInput">
                    <RadioGroup
                      row
                      aria-labelledby="radio-buttons-group-label"
                      name="radio-buttons-group">
                      <FormControlLabel
                        name="gender"
                        value="male"
                        onChange={(e) =>
                          setUser({ ...user, gender: e.target.value })
                        }
                        control={<Radio required />}
                        label="Male"
                      />
                      <FormControlLabel
                        name="gender"
                        value="female"
                        onChange={(e) =>
                          setUser({ ...user, gender: e.target.value })
                        }
                        control={<Radio required />}
                        label="Female"
                      />
                    </RadioGroup>
                  </div>
                </div>
                {/* <!-- gender input --> */}

                {/* <!-- input container column --> */}
                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required
                  />
                  <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    type="password"
                    name="cpassword"
                    value={cpassword}
                    onChange={(e) =>
                      setUser({ ...user, cpassword: e.target.value })
                    }
                    required
                  />
                </div>
                {/* <!-- input container column --> */}

                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                  <Avatar
                    alt="Avatar Preview"
                    src={preview}
                    sx={{ width: 56, height: 56 }}
                  />
                  <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleDataChange}
                      className="hidden"
                    />
                    Choose File
                  </label>
                </div>
                <button
                  type="submit"
                  className="text-white py-3 w-full bg-orange-600 shadow hover:shadow-lg rounded-sm font-medium">
                  Signup
                </button>
                <Link
                  to="/login"
                  className="hover:bg-gray-50 text-blue-600 text-center py-3 w-full shadow border rounded-sm font-medium">
                  Existing User? Log in
                </Link>
              </div>
            </form>
            {/* <!-- personal info procedure container --> */}
          </div>
          {/* <!-- signup column --> */}
        </div>
        {/* <!-- row --> */}
      </main>
    </>
  );
};

export default Register;
