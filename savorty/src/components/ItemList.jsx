import React from "react";
import Item from "./Item";

const ItemList = ({ food }) => {
  return (
    <div>
      {food.extendedIngredients.map((item) => (
        <Item item={item} />
      ))}
    </div>
  );
};

export default ItemList;
