'use client'
import { useEffect, useState } from 'react';
import { fetchData } from '../../fetchdata';
import Stars from './components/star';
import { useRouter } from 'next/navigation';
import { Recipe } from '../../types';
import Image from 'next/image';

interface RecipeResponse {
  recipes: Recipe[];
}
export default function Home() {
  // State to store the recipes array
  const [recipes, setRecipes] = useState<Recipe[]>([]);
const router = useRouter()
  useEffect(() => {
    // Fetch data from API
    async function FetchData() {
      const res = await fetchData<RecipeResponse>('https://dummyjson.com/recipes');
      // Extract 'recipes' array from the response and save it to the state
      setRecipes(res.recipes);
    }

    FetchData();
  }, []);

  return (
    <div className=' grid md:grid-cols-3 grid-1 gap-3 sm:grid-cols-2 mt-10'>
      
        {recipes.map((recipe) => (
          <div key={recipe.id} className='h-auto w-90 p-9 bg-slate-100 shadow-xl flex flex-col justify-center items-center mb-10 gap-5'>
            
            <h2 className='text-2xl  text-gray-800 font-bold'>{recipe.name}</h2>
            <Image src={recipe.image} alt={recipe.name} width={200} height={200} />
            <p>Calories: {recipe.caloriesPerServing} | Servings: {recipe.servings}</p>
            
            <p><Stars stars={recipe.rating} reviews={recipe.reviewCount}/></p>
            <button className='h-8 w-40 text-sky-600' onClick={()=> router.push(`/recipes/${recipe.id}`)}>View Recipe</button>
          </div>
        ))}
      
    </div>
  );
}

