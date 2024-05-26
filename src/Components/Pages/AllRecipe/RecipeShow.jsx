import React, { useEffect } from 'react';
import { useState } from 'react';

const RecipeShow = ({ record, handleViewRecipe }) => {
  const [name, setName] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/purchaser-name/${record._id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setName(data.data);
      });
  }, []);
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={record?.image} className="w-[400px] h-full" alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{record?.name}</h2>
        <div className="text-xl">{record?.country}</div>
        <div className="pb-1">{record?.email}</div>
        <div className="pb-1">
          {name.length != 0 && (
            <div>
              <h1 className="text-xl pb-1">Purchased By</h1>
              <div className="grid grid-cols-2">
                {name.map((name) => (
                  <div key={name}>{name}</div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleViewRecipe(record)}
            className="btn btn-primary"
          >
            View The Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeShow;