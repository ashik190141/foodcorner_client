import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCoin from "../../../Hooks/useCoin";
import { AuthContext } from "../../Providers/AuthProviders/AuthProviders";

const Banner = () => {
  const { user, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [, refetch] = useCoin();

  const handleAddRecipe = () => {
    if (user?.email) {
      navigate("/add-recipe");
    } else {
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
    }
  };
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/9HjncnS/video-2024-03-21-20-27-52.gif)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl font-bold">
            Unlock the Joy of Cooking with Every Recipe
          </h1>
          <p className="mb-5 text-center">
            “Share Your Flavor, Inspire the World! Connect with food lovers,
            share your favorite recipes, discover new dishes, and celebrate the
            joy of cooking. Join our community and make the world a tastier
            place”.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Link to="/all-recipe">
              <button className="text-xl w-48 h-14 text-white bg-sky-800 overflow-hidden relative z-10 group hover:text-sky-900 duration-700">
                See Recipes
                <span className="bg-sky-900 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-50 size-32 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
                <span className="bg-sky-800 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-100 size-28 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
                <span className="bg-sky-600 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-200 size-24 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
                <span className="bg-sky-500 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-300 size-20 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
                <span className="bg-sky-500 group-hover:scale-125 scale-0 ease-in-out duration-300 delay-[400ms] size-16 rounded-full absolute mx-auto my-auto inset-0 -z-10"></span>
              </button>
            </Link>
            <button
              onClick={handleAddRecipe}
              type="button"
              className="relative bg-slate-100 bg-opacity-15 inline-block h-14 w-40 overflow-hidden border-sky-500 px-5 py-2 text-sky-500 shadow-lg before:absolute before:inset-0 before:-z-10 before:block before:translate-x-[90%] before:rounded-s-full before:bg-sky-600 before:duration-200 after:absolute after:inset-0 after:-z-10 after:block after:-translate-x-[90%] after:rounded-e-full after:bg-sky-600 after:duration-500 hover:text-white before:hover:translate-x-0 after:hover:translate-x-0"
            >
              Add Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
