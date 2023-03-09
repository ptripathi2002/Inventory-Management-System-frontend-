import React, { useState } from "react";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import styles from "./auth.module.scss";
import { toast } from "react-toastify";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import {
  loginUser,
  validateEmail,
} from "../../redux/features/auth/authService";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!email || !password) {
      return toast.error("All Fields are Required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please Enter a Valid Email");
    }

    const userData = {
      email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await loginUser(userData);

      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} />
          </div>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input
              type="text"
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
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
            <Link to="/forgotPassword">Forgot Password</Link>
            <span className={styles.register}>
              <Link to="/">Home</Link>
              <p>&nbsp;Don't have an account?&nbsp;</p>
              <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
