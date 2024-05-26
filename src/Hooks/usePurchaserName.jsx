import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../Components/Providers/AuthProviders/AuthProviders";

const usePurchaserName = (recipeId) => {
  console.log(recipeId);
  const { user } = useContext(AuthContext);
  const { refetch, data: purchaserName = [] } = useQuery({
    queryKey: ["purchaserName", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://foodcorner-omega.vercel.app/purchaser-name/${recipeId}`,
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
  return [purchaserName, refetch];
};

export default usePurchaserName;
