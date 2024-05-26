import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import useTitle from '../../../Hooks/useTitle';
import { AuthContext } from '../../Providers/AuthProviders/AuthProviders';
import UploadingSpinner from '../../Shared/LoadSpinner/UploadingSpinner';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import useCoin from '../../../Hooks/useCoin';
import Swal from 'sweetalert2';
import RecipeShow from './RecipeShow';

const AllRecipe = () => {
    useTitle("All Recipe");
    const [records, setRecords] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [show, setShow] = useState(true);
    const [recipesCategory, setRecipesCategory] = useState([]);
    const [country, setCountry] = useState([]);
    const [text, setText] = useState("Category");
    const [countryText, setCountryText] = useState("Country");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [coin, refetch] = useCoin();
    // console.log(coin?.coin);

    useEffect(() => {
        fetch("http://localhost:5000/all-recipe")
          .then((res) => res.json())
          .then((data) => {
            setShow(false)
            console.log(data);
            setRecipes(data);
            setRecords(data);
          });
    }, []);

    useEffect(() => {
      fetch("/recipe.json")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setRecipesCategory(data);
        });
    }, []);

    useEffect(() => {
      fetch("/country.json")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setCountry(data);
        });
    }, []);

    const handleCategory = (value) => {
        setText(value)
        let searchText = value.toLowerCase();
        console.log(searchText);
        if (searchText == "all") {
            setRecords(recipes);
        } else {
            setRecords(
            recipes.filter((recipe) =>
                recipe.category.toLowerCase() == searchText
            )
            );
        }
    };

    const handleCountry = (value) => {
      setCountryText(value);
      let searchText = value.toLowerCase();
      console.log(searchText);
      if (searchText == "all") {
        setRecords(recipes);
      } else {
        setRecords(
          recipes.filter(
            (recipe) => recipe.country.toLowerCase() == searchText
          )
        );
      }
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
            navigate(`/recipe/${record._id}`)
        } else if (coin?.coin < 10) {
            Swal.fire({
              title: "error",
              text: "Can Not Have Enough Coin",
              icon: "success",
              confirmButtonText: "OK!!!",
            }).then(result => {
                if (result.isConfirmed) {
                    navigate("/payment")
                }
            });
        } else if (user?.email && isPurchased) {
          navigate(`/recipe/${record._id}`);
        }else if (user?.email && coin?.coin >= 10) {
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
                    email: user?.email
                }
                fetch("http://localhost:5000/purchase-recipe", {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json",
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
    }

    const handleSearch = (e) => {
      let searchText = e.target.value.toLowerCase();
      // console.log(searchText)
      setRecords(
        recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchText)
        )
      );
    };

    return (
      <div className="max-w-7xl mx-auto py-5 px-5">
        <div className="flex flex-col md:flex-row items-center justify-between pt-5">
          <div className="flex flex-col md:flex-row">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1 w-52">
                {text}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li
                  className="cursor-pointer pt-1"
                  onClick={() => handleCategory("ALL")}
                >
                  <p
                    className={`${
                      text == "ALL" ? "text-blue-600 font-bold" : ""
                    }`}
                  >
                    ALL
                  </p>
                </li>
                {recipesCategory?.map((category) => (
                  <li
                    className="cursor-pointer pt-1"
                    key={category.id}
                    onClick={() => handleCategory(category.category)}
                  >
                    <p
                      className={`${
                        text == category.category
                          ? "text-blue-600 font-bold"
                          : ""
                      }`}
                    >
                      {category.category}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown ">
              <div tabIndex={0} role="button" className="btn m-1 w-56">
                {countryText}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1]  p-2 shadow bg-base-100 rounded-box w-52 flex flex-col h-[500px] overflow-y-auto"
              >
                <li
                  className="cursor-pointer pt-1"
                  onClick={() => handleCountry("ALL")}
                >
                  <p
                    className={`${
                      countryText == "ALL" ? "text-blue-600 font-bold" : ""
                    }`}
                  >
                    ALL
                  </p>
                </li>
                {country?.map((country) => (
                  <li
                    className="cursor-pointer py-1"
                    key={country.id}
                    onClick={() => handleCountry(country.country)}
                  >
                    <p
                      className={`${
                        text == country.country ? "text-blue-600 font-bold" : ""
                      }`}
                    >
                      {country.country}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="join w-[300px]">
            <input
              onChange={handleSearch}
              autoComplete="off"
              className="input input-bordered join-item w-full"
              id="search"
              placeholder="Enter Recipe Name"
            />
          </div>
        </div>
        <div className="py-10">
          {show ? (
            <UploadingSpinner></UploadingSpinner>
          ) : (
            <div>
              {records?.map((record) => (
                <div key={record._id} className="py-2">
                  <RecipeShow
                    record={record}
                    handleViewRecipe={handleViewRecipe}
                  ></RecipeShow>
                </div>
              ))}
            </div>
          )}
        </div>
        <ToastContainer></ToastContainer>
      </div>
    );
};

export default AllRecipe;