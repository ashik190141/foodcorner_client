import React, { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recipe = ({ recipe }) => {
    const [accepted, setAccepted] = useState(true);

    const handleAccepted = event => {
        setAccepted(event.target.checked);
        toast.success('🦄 The recipe is your favorite', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const { ingredients, method, rating, recipeImage, recipeName } = recipe;
    // console.log(ingredients);
    return (
        <div className='grid md:grid-cols-2 grid-cols-1 gap-5 items-center justify-between border p-5 border-violet-500 rounded-xl mb-10'>
            <div>
                <p className='font-bold text-3xl mb-3'>{recipeName}</p>
                <p className='text-xl font-bold'>Ingredients:</p>
                <div>
                    {
                        ingredients.map(ingredient=> <p>{ingredient}</p>)
                    }
                </div>
                <p className='text-xl font-bold mt-3'>Method:</p>
                <p className='text-xl text-justify mt-3'>{method}</p>
                <div className='flex gap-5 mt-3'>
                    <Rating style={{ maxWidth: 100 }} value={Math.round(rating || 0)} readOnly />
                    <span className='ms-2'> {rating}</span>
                </div>
                <button onClick={handleAccepted} disabled={!accepted} className="btn btn-success mt-3">Add to Favorite</button>
            </div>
            <div className='flex items-center justify-end'>
                <img src={recipeImage} alt="" className='rounded-xl'/>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Recipe;