import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Components/Providers/AuthProviders/AuthProviders";

const useSameCategory = (id) => {
  console.log(id);
  const { user } = useContext(AuthContext);

  const { refetch, data: category = [] } = useQuery({
    queryKey: ["category", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://foodcorner-omega.vercel.app/recipe-same-category/${id}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return res.json();
    },
  });
  return [category, refetch];
};

export default useSameCategory;
