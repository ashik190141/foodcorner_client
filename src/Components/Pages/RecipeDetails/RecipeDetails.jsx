import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import UploadingSpinner from "../../Shared/LoadSpinner/UploadingSpinner";
import { FaHeart } from "react-icons/fa";
import usePurchase from "../../../Hooks/usePurchase";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders/AuthProviders";
import PurchasedByName from "./PurchasedByName";
import useSameCategory from "../../../Hooks/useSameCategory";
import useCoin from "../../../Hooks/useCoin";
import Swal from "sweetalert2";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [recipe, setRecipe] = useState();
  const [react, refetch1] = usePurchase(id);
  const [category] = useSameCategory(id);
  const [coin, refetch] = useCoin();
  const navigate = useNavigate();
  console.log(react);

  useEffect(() => {
    fetch(`https://foodcorner-omega.vercel.app/recipe/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.result) {
          setShow(false);
          setRecipe(data?.data);
        }
      });
  }, [id]);

  const handleReact = (id) => {
    console.log(id);
    const reactBody = {
      email: user?.email,
      react: react.react,
    };
    fetch(`https://foodcorner-omega.vercel.app/recipe-react/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(reactBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.result) {
          refetch1();
        }
      });
  };

  const handleViewRecipe = (record) => {
    let isPurchased = false;
    const purchased = record.purchased;
    for (let i = 0; i < purchased.length; i++) {
      let purchaserEmail = purchased[i].email;
      if (purchaserEmail == user?.email) {
        isPurchased = true;
        break;
      }
    }

    if (!user) {
      toast.error("Login First", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (record?.email == user?.email) {
      navigate(`/recipe/${record._id}`);
    } else if (coin?.coin < 10) {
      Swal.fire({
        title: "error",
        text: "Can Not Have Enough Coin",
        icon: "success",
        confirmButtonText: "OK!!!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/payment");
        }
      });
    } else if (user?.email && isPurchased) {
      navigate(`/recipe/${record._id}`);
    } else if (user?.email && coin?.coin >= 10) {
      Swal.fire({
        title: "You Spending 10 Coins",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Spend",
      }).then((result) => {
        if (result.isConfirmed) {
          const purchasedInfo = {
            recipeId: record._id,
            creator: record.email,
            email: user?.email,
          };
          fetch("https://foodcorner-omega.vercel.app/purchase-recipe", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(purchasedInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              setShow(false);
              if (data.result) {
                Swal.fire({
                  text: "Purchased The Recipe",
                  icon: "success",
                  title: data?.message,
                  confirmButtonText: "Ok..",
                }).then((result) => {
                  if (result.isConfirmed) {
                    refetch();
                    navigate(`/recipe/${record._id}`);
                  }
                });
              }
            });
        }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-5">
      {show ? (
        <UploadingSpinner></UploadingSpinner>
      ) : (
        <div>
          <iframe
            width="100%"
            height="500"
            src={recipe?.videoUrl}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div className="py-2">{recipe?.watchCount} View</div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="pt-2 text-xl">{recipe?.name}</div>
            <div>
              <FaHeart
                onClick={() => handleReact(recipe?._id)}
                className={`text-2xl cursor-pointer ${
                  react.react ? "text-red-500" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="pt-2 text-xl">{recipe?.category}</div>
            <div>{recipe?.country}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
            <div>
              <img
                src={recipe?.image}
                alt=""
                className="rounded-lg w-[400px] h-[300px]"
              />
            </div>
            <div className="text-justify">{recipe?.description}</div>
          </div>
          <div className="pt-10">
            <PurchasedByName id={recipe?._id}></PurchasedByName>
          </div>
          <div className="pt-10 grid grid-cols-1 md:grid-cols-3">
            {category.map((category) => (
              <div key={category._id}>
                <div
                  className="card card-compact w-80 md:w-96 shadow-xl cursor-pointer"
                  onClick={() => handleViewRecipe(category)}
                >
                  <figure>
                    <div className="group overflow-hidden relative">
                      <img
                        src={category?.image}
                        alt=""
                        className="w-[400px] h-[300px] transform group-hover:scale-105 transition-all duration-300"
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 
                        group-hover:opacity-70 transition-opacity duration-300 bg-white/70"
                      >
                        <p className="text-black font-black text-3xl">
                          {category?.name}
                        </p>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
