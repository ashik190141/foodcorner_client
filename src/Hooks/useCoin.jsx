import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Components/Providers/AuthProviders/AuthProviders';

const useCoin = () => {
    const { user } = useContext(AuthContext);
    const { refetch, data: coin = [] } = useQuery({
      queryKey: ["coins", user?.email],
    //   enabled: !loading && !!user?.email,
      queryFn: async () => {
        const res = await fetch(`http://localhost:5000/users/${user?.email}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        return res.json();
      }
    });
    return [coin, refetch];
};

export default useCoin;