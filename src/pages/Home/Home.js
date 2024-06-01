import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogout } from "../../components/protect/HiddenLink";
import { ShowOnLogin } from "../../components/protect/HiddenLink";
import "./Home.scss";
const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <RiProductHuntLine size={35} />
        </div>
        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/register">Register</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>

      <section className="container hero">
        <div className="hero-text">
          <h2>Inventory {"&"} Stock Management Solution</h2>
          <p>
            Inventory system to control and manage products in the warehouse in
            real time and easily integrable to make it easier to develop your business.
          </p>
         
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
