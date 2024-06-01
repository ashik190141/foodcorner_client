import React, { useContext } from 'react';
import useCoin from '../../Hooks/useCoin';
import { AuthContext } from '../Providers/AuthProviders/AuthProviders';

const PrivateRoute = ({children}) => {
    const { user, loading, loginWithGoogle } = useContext(AuthContext);
    const [, refetch] = useCoin();
    if (loading) {
        return <progress className="progress w-56"></progress>
    }
    if (user) {
        return children;
    }

    const handleLogin = () => {
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
    return (
      <div className="uppercase text-red-600 flex items-center justify-center text-2xl mt-10 ">
        <span onClick={handleLogin} className='border border-blue-600 px-5 py-1 rounded-lg cursor-pointer'>Login First</span>
      </div>
    );
};

export default PrivateRoute;