import React, { useEffect, useState } from "react";

const FoodDetails = ({ foodId }) => {
  const [food, setFood] = useState(null);
  const API_KEY = "cb2f64834c80463daafb44a5a8009955";
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;

  useEffect(() => {
    if (!foodId) return;

    async function fetchFood() {
      try {
        const res = await fetch(`${URL}?apiKey=${API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        console.log(data);
        setFood(data);
      } catch (err) {
        console.error("Error fetching food details:", err);
      }
    }

    fetchFood();
  }, [foodId]);

  if (!food) return <div>Loading... 🤔</div>;

  return (
    <div>
      <div>
        <h1>{food.title}</h1>
        <img src={food.image} alt={food.title} />
        <div>
          <span>
            <strong>⏱️ {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👨‍👩‍👧‍👦 <strong>Serves {food.servings}</strong>
          </span>
          <span>{food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-Vegetarian"}</span>
          <span>{food.vegan ? "🐄 Vegan" : ""}</span>
        </div>
        <div>
          💰{" "}
          <span>
            ${((food.pricePerServing || 0) / 100).toFixed(2)} per serving
          </span>
        </div>
      </div>

      <div>
        <h2>Instructions</h2>
        {food.analyzedInstructions?.length > 0 ? (
          <ol>
            {food.analyzedInstructions[0].steps.map((step, index) => (
              <li key={index}>{step.step}</li>
            ))}
          </ol>
        ) : (
          <p>No instructions available.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
