/* import React, { useEffect } from "react";

const FoodDetails = ({ foodId }) => {
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "cb2f64834c80463daafb44a5a8009955";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
    }
    fetchFood();
  }, []);
  return <div>Food Details {foodId}</div>;
};

export default FoodDetails;
*/

import React, { useEffect, useState } from "react";

const FoodDetails = ({ foodId }) => {
  const [food, setFood] = useState({});
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

  return (
    <div>
      Food Details: {foodId}
      {food.title}
      <img src={food.image} alt="" />
    </div>
  );
};

export default FoodDetails;
