import React, { useState } from "react";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import styles from "./auth.module.scss";
import { toast } from "react-toastify";
import {
  forgotPassword,
  validateEmail,
} from "../../redux/features/auth/authService";

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please fill the below field first");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid Email");
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
    navigate("/login");
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
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

export default Forgot;
