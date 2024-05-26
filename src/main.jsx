import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Components/Layout/Main.jsx';
import Home from './Components/Pages/Home/Home.jsx';
import AuthProviders from './Components/Providers/AuthProviders/AuthProviders';
import ErrorPage from './Components/Pages/ErrorPage/ErrorPage.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddRecipe from './Components/Pages/AddRecipe/AddRecipe.jsx';
import PurchaseCoin from './Components/Pages/PurchaseCoin/PurchaseCoin.jsx';
import Payment from './Components/Pages/Payment/Payment.jsx';
import AllRecipe from './Components/Pages/AllRecipe/AllRecipe.jsx';
import RecipeDetails from './Components/Pages/RecipeDetails/RecipeDetails.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-recipe",
        element: <AddRecipe></AddRecipe>,
      },
      {
        path: "/purchaseCoin",
        element: <PurchaseCoin></PurchaseCoin>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/all-recipe",
        element: <AllRecipe></AllRecipe>,
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetails></RecipeDetails>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={router} />
      </AuthProviders>
    </QueryClientProvider>
  </React.StrictMode>
);
