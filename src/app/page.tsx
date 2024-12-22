
import Image from "next/image";
import { Recipe } from "../../types";
import { Style_Script } from "next/font/google";
import Link from "next/link";
import Button from "./components/button";

const styleScript = Style_Script({
  subsets: ["latin"],
  weight: "400",
});

async function fetchRecipes(): Promise<Recipe[]> {
  // Fetching data on the server
  const res = await fetch("https://dummyjson.com/recipes");
  const data = await res.json();
  return data.recipes;
}



export default async function Home() {
  const recipes = await fetchRecipes();
//bg-[#F5F0CD]

  return (
    <main className="max-w-[1536px] mx-auto w-full bg-[#fcf0f0]  pb-10">
      <div className="relative text-center h-[536px] w-full grid place-items-center">
        <Image
          src={"/heroSection.png"}
          height={636}
          width={500}
          alt="herosection"
          className="w-full h-[536px]"
        />
        <div className="absolute">
          <h1 className="font-extrabold text-3xl text-center font-serif text-white">
            Discover Delicious Recipes <br />
            for Every Mood!
          </h1>
          <Button/>
          
        </div>

        <div className="w-full grid grid-flow-col gap-1 lg:px-28 px-3 sm:px-6 absolute bottom-[-60px] sm:bottom-[-80px] lg:bottom-[-110px] justify-center">
          <Image
            src={"/hero1.png"}
            height={230}
            width={285}
            alt="hero1"
            className="h-[100px] sm:h-[150px] lg:h-[200px] w-full"
          />
          <Image
            src={"/hero2.png"}
            height={230}
            width={285}
            alt="hero2"
            className="h-[100px] sm:h-[150px] lg:h-[200px] w-full"
          />
          <Image
            src={"/hero3.png"}
            height={230}
            width={285}
            alt="hero3"
            className="h-[100px] sm:h-[150px] lg:h-[200px] w-full"
          />
          <Image
            src={"/hero4.png"}
            height={230}
            width={285}
            alt="hero4"
            className="h-[100px] sm:h-[150px] lg:h-[200px] w-full"
          />
        </div>
      </div>

      <div className="w-full mt-36 h-auto px-5">
        <h1
          className={`font-extrabold text-[30px] sm:text-[40px] text-[#FE4A51] text-center ${styleScript.className}`}
        >
          From Our Kitchen to Your Screen
        </h1>

        <div id="blogs" className="w-full grid   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 h-auto px-1  sm:px-6 lg:px-8">
  {recipes.map((recipe) => (
    <div
      key={recipe.id}
      className="h-auto w-full grid gap-1 rounded-lg  bg-[#fff6f6]  shadow-lg border-[1px] border-gray-300"
    >
      <div className="w-full h-[300px] sm:h-[200px]" >
      <Image
        src={recipe.image}
        alt="food"
        height={300}
        width={400}
        className="rounded-t-md w-full h-full  rounded-lg"
      />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg text-[#fa4147] ">{recipe.name}</h2>
        <p className="text-sm text-gray-600 mt-1">
          Prep Time: {recipe.prepTimeMinutes} minutes
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Calories: {recipe.caloriesPerServing} | Servings: {recipe.servings}
        </p>
        <Link href={`/recipes/${recipe.id}`}  className="text-[#FE4A51] mt-2">Read Racepe.....</Link>
      </div>
    </div>
  ))}
</div>

      </div>
    </main>
  );
}