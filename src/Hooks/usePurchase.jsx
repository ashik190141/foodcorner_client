import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../Components/Providers/AuthProviders/AuthProviders";

const usePurchase = (recipeId) => {
  console.log(recipeId);
  const { user } = useContext(AuthContext);

  const { refetch, data: purchase = Object } = useQuery({
    queryKey: ["purchase", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://foodcorner-omega.vercel.app/recipe-purchaser/${user?.email}/${recipeId}`,
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
  return [purchase, refetch];
};

export default usePurchase;
