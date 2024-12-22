import Image from "next/image";
import { Style_Script } from "next/font/google";
import Comments from "@/app/components/comments";

const styleScript = Style_Script({
  subsets: ["latin"],
  weight: "400",
});

// Fetch recipe data
async function fetchRecipe(id: string) {
  try {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`, {
      next: { revalidate: 30 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error("Failed to fetch recipe");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

// Server Component for Recipe Detail
export default async function RecipeDetail({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await fetchRecipe(params.id);

  console.log(recipe);

  if (!recipe) {
    return (
      <div className="text-center mt-6">
        <p className="text-red-500 text-lg">Recipe not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1536px] mx-auto  bg-[#fcf0f0] h-full w-full ">
      <div className="py-9 w-full px-2 sm:px-8 md:px-12 ">
        <h1
          className={`${styleScript.className}  text-[40px] font-extrabold text-center text-[#fa4147]`}
        >
          {recipe.name} Recipe
        </h1>

        <div className="w-[100%] bg-[#fff6f6]  shadow-lg h-auto mt-5 flex lg:flex-row  flex-col ">
          <div className="w-full lg:w-[50%] flex justify-end items-center h-auto">
            {" "}
            <Image
              src={recipe.image}
              alt={recipe.name}
              height={400}
              width={400}
              className="sm:h-[400px] h-[250px] lg:min-h-[480px] lg:h-full w-full"
            />{" "}
          </div>
          <div className=" w-full lg:w-[50%] p-8 h-auto flex flex-col ">
            <div className="w-[100%]  flex md:flex-row flex-col"> 
            <div className="md:w-[50%]  w-full h-auto p-2  md:border-r  md:border-r-gray-300">
              <h1 className="text-center font-bold pt-1">Instructions</h1>
              <ul className="list-decimal sm:pl-5 space-y-1 pb-2 text-gray-600 pt-3">
                {recipe.instructions.map(
                  (instruction: string, index: number) => (
                    <li key={index}>{instruction}</li>
                  )
                )}
              </ul>
            </div>
            <div className="md:w-[50%] w-full  h-auto p-2">
              <h1 className="text-center  font-bold pt-1">Ingredients</h1>
              <ul className="list-disc sm:pl-5 space-y-1 text-gray-600 pt-3">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            </div>


            <div className="grid  grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 text-gray-600 pt-3 border-t border-t-gray-500">
        <p>
          <span className="font-semibold ">Prep Time:</span> {recipe.prepTimeMinutes} minutes
        </p>
        <p>
          <span className="font-semibold">Cook Time:</span> {recipe.cookTimeMinutes} minutes
        </p>
        <p>
          <span className="font-semibold"> Servings:</span> {recipe.servings}
        </p>
        <p>
          <span className="font-semibold">Difficulty:</span> {recipe.difficulty}
        </p>
        <p>
          <span className="font-semibold">Calories Serving:</span> {recipe.caloriesPerServing}
        </p>
      </div>


          </div>


        </div>
        {/* blogId={recipe.id} */}
        <Comments  blogId={recipe.id} />
      </div>
</div>
  );
}