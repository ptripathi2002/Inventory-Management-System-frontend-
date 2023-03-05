import React, { useState } from "react";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import styles from "./auth.module.scss";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../redux/features/auth/authService";

const initialState = {
  password: "",
  password2: "",
};
const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const navigate = useNavigate();

  // Getting Params out of Reset URL sent on Email ID

  const { resetToken } = useParams();

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password should must be atleast of 6 Characters");
    }
    if (password != password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
      password2,
    };
    try {
      const data = await resetPassword(userData, resetToken);
      toast.success("Password Successfully Changed");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>

            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
