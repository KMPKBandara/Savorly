import React, { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";

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
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt={food.title} />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⏱️ {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👨‍👩‍👧‍👦 <strong>Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-Vegetarian"}
            </strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐄 Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          💰{" "}
          <span>
            <strong>
              ${((food.pricePerServing || 0) / 100).toFixed(2)} per serving
            </strong>
          </span>
        </div>
      </div>

      <h2>Ingredients</h2>
      <ItemList food={food} />

      <div>
        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
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
    </div>
  );
};

export default FoodDetails;
