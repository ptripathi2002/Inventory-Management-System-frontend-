import React, { useState } from "react";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { TiUserAddOutline } from "react-icons/ti";
import styles from "./auth.module.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import {
  registerUser,
  validateEmail,
} from "../../redux/features/auth/authService";
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !password2) {
      return toast.error("Please fill all the required fields");
    }
    if (password.length < 6) {
      return toast.error("Password must be of 6 Characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please Enter a Valid Email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      toast.success("User Registered Successfully");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} />
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="Password"
              placeholder="Confirm Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>

            <span className={styles.register}>
              <Link to="/">Home</Link>
              <p>&nbsp;Already have an account?&nbsp;</p>
              <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Register;
