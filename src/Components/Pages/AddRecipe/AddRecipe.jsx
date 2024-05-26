import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders/AuthProviders";
import UploadingSpinner from "../../Shared/LoadSpinner/UploadingSpinner";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../Hooks/useTitle";

const AddRecipe = () => {
  useTitle("Add Recipe");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=d0a7e1f328b83330a0ea0321f368cb7f`;
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    fetch("/recipe.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipes(data);
      });
  }, []);

  useEffect(() => {
    fetch("/country.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCountry(data);
      });
  }, []);

  const onSubmit = async (data) => {
    setShow(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imageHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (imgResponse) => {
        if (imgResponse.success) {
          const recipeDetails = {
            name: data.name,
            country: data.country,
            videoUrl: data.videoUrl,
            description: data.description,
            category: data.category,
            image: imgResponse.data.display_url,
            email: user?.email,
            watchCount: 0,
            purchased: [],
            react: [],
          };
          fetch("https://foodcorner-omega.vercel.app/create-recipe", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(recipeDetails),
          })
            .then((res) => res.json())
            .then((data) => {
              setShow(false);
              if (data.result) {
                Swal.fire({
                  title: data?.message,
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate("/");
                  }
                });
              }
            });
        }
      });
  };
  return (
    <div className="my-10">
      <div className="hero min-h-screen">
        <div className="card w-[50%] shadow-xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="uppercase py-5 text-xl">Add Recipe</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Name</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Recipe Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <select
                className="select p-2 border-2 border-black bg-transparent w-full"
                id="country"
                {...register("country", { required: true })}
              >
                {country?.map((country) => (
                  <option key={country.id} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Youtube Video Code</span>
              </label>
              <input
                type="url"
                id="videoUrl"
                {...register("videoUrl")}
                placeholder="Video Url"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Category</span>
              </label>
              <select
                className="select p-2 border-2 border-black bg-transparent w-full"
                id="category"
                {...register("category", { required: true })}
              >
                {recipes?.map((category) => (
                  <option key={category.id} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Details</span>
              </label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Description"
                className="textarea textarea-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipe Image</span>
              </label>
              <input
                type="file"
                id="image"
                {...register("image")}
                placeholder="Image URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              {!show ? (
                <input
                  type="submit"
                  value="Submit"
                  className="input input-bordered hover:cursor-pointer"
                />
              ) : (
                <div>
                  <UploadingSpinner></UploadingSpinner>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
