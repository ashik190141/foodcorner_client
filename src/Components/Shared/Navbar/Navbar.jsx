import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img from "../../../Image/profile.png";
import "./Navbar.css";
import img1 from "../../../Image/logo.png";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProviders/AuthProviders";
import useCoin from "../../../Hooks/useCoin";
import { FaCoins } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [coin, refetch] = useCoin();
  // console.log(coin);

  const logoutHandler = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("accessToken");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleLoginHandler = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        localStorage.setItem("accessToken", user.accessToken);
        const saveUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          coin: 50,
        };
        fetch("https://foodcorner-omega.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            refetch();
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const NavLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-600 text-xl font-bold" : "text-white text-xl"
        }
      >
        Home
      </NavLink>
      {user && (
        <NavLink
          to="/add-recipe"
          className={({ isActive }) =>
            isActive ? "text-blue-600 text-xl font-bold" : "text-white text-xl"
          }
        >
          Add Recipes
        </NavLink>
      )}
      <NavLink
        to="/all-recipe"
        className={({ isActive }) =>
          isActive ? "text-blue-600 text-xl font-bold" : "text-white text-xl"
        }
      >
        Recipes
      </NavLink>
    </>
  );

  const ResponsiveNavLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-600 text-xl font-bold" : "text-white text-xl"
        }
      >
        Home
      </NavLink>
      {user && (
        <NavLink
          to="/add-recipe"
          className={({ isActive }) =>
            isActive ? "text-blue-600 text-xl font-bold" : "text-white text-xl"
          }
        >
          Add Recipes
        </NavLink>
      )}
      <NavLink
        to="/all-recipe"
        className={({ isActive }) =>
          isActive ? "text-blue-600 text-xl font-bold" : "text-white text-xl"
        }
      >
        Recipes
      </NavLink>
      {user && (
        <Link to="/purchaseCoin">
          <div className="btn bg-transparent gap-3 border-none">
            <FaCoins className="text-xl text-yellow-600"></FaCoins>
            <div className="badge badge-secondary ml-1">{coin.coin || 0}</div>
          </div>
        </Link>
      )}
      {user ? (
        <div className="flex items-center gap-3">
          {user.photoURL ? (
            <div className="flex md:gap-4">
              <img
                src={user.photoURL}
                alt=""
                className={`pro-img md:mr-10 rounded-xl`}
              />
            </div>
          ) : (
            <div className="flex md:gap-4">
              <img src={img} alt="" className={`pro-img md:mr-10 rounded-xl`} />
            </div>
          )}
          <div
            onClick={logoutHandler}
            className="btn btn-primary rounded-md text-white md:mr-10 mr-1"
          >
            Log Out
          </div>
        </div>
      ) : (
        <div onClick={googleLoginHandler} className="mx-auto">
          <div className="btn">
            <FaGoogle className="me-2" /> Login With Google
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="navbar bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
          >
            {ResponsiveNavLinks}
          </ul>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <img src={img1} alt="" className="w-16 h-12 rounded-lg" />
          <div className="text-white md:text-2xl text-xl font-bold">
            <Link to="/">FoodCorner</Link>
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-5">{NavLinks}</ul>
      </div>
      <div className="navbar-end">
        <div className="hidden md:block">
          <div className="flex md:gap-5 gap-1 items-center justify-center ">
            {user && (
              <Link to="/purchaseCoin">
                <div className="btn bg-transparent gap-3 border-none">
                  <FaCoins className="text-xl text-yellow-600"></FaCoins>
                  <div className="badge badge-secondary ml-1">
                    {coin.coin || 0}
                  </div>
                </div>
              </Link>
            )}
            {user ? (
              <div className="flex items-center">
                {user.photoURL ? (
                  <div className="flex md:gap-4">
                    <img
                      src={user.photoURL}
                      alt=""
                      className={`pro-img md:mr-10 rounded-xl`}
                    />
                  </div>
                ) : (
                  <div className="flex md:gap-4">
                    <img
                      src={img}
                      alt=""
                      className={`pro-img md:mr-10 rounded-xl`}
                    />
                  </div>
                )}
                <div
                  onClick={logoutHandler}
                  className="btn btn-primary rounded-none text-white md:mr-10 mr-1"
                >
                  Log Out
                </div>
              </div>
            ) : (
              <div onClick={googleLoginHandler} className="mx-auto">
                <div className="btn">
                  <FaGoogle className="me-2" /> Login With Google
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
