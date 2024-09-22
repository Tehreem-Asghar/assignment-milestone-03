'use client';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../../fetchdata';
import { Recipe } from '../../../../types';

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  // Load recipe data
  useEffect(() => {
    async function getRecipe() {
      try {
        const data = await fetchData<Recipe>(`https://dummyjson.com/recipes/${params.id}`);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    }
    getRecipe();
  }, [params.id]);

  // Load comments from local storage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${params.id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [params.id]);

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment(''); // Clear the input
      localStorage.setItem(`comments-${params.id}`, JSON.stringify(updatedComments));
    }
  };

  // Handle comment deletion
  const handleCommentDelete = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem(`comments-${params.id}`, JSON.stringify(updatedComments));
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!recipe) return <p className="text-center">Recipe not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="w-full h-auto rounded-lg mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Ingredients</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Instructions</h2>
          <ol className="list-decimal pl-5 space-y-1 text-gray-600">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600 mb-4">
        <p><span className="font-semibold">Prep Time:</span> {recipe.prepTimeMinutes} minutes</p>
        <p><span className="font-semibold">Cook Time:</span> {recipe.cookTimeMinutes} minutes</p>
        <p><span className="font-semibold">Servings:</span> {recipe.servings}</p>
        <p><span className="font-semibold">Difficulty:</span> {recipe.difficulty}</p>
        <p><span className="font-semibold">Calories per Serving:</span> {recipe.caloriesPerServing}</p>
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
            Submit
          </button>
        </form>

        <div className="space-y-2">
          {comments.map((comment, index) => (
            <div key={index} className="flex justify-between items-center p-2 border border-gray-200 rounded-md">
              <span>{comment}</span>
              <button 
                onClick={() => handleCommentDelete(index)} 
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
