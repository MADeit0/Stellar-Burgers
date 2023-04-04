import React from "react";
import IngredientsBoardStyle from "./IngredientsBoard.module.css";
import PropTypes from "prop-types";

import Ingredient from "../Ingridient/Ingredient.jsx";

import { IngredientsContext } from "../../services/ingredientsContext";

const IngredientsBoard = ({ title, menu, onClick }) => {
  const ingredientsData = React.useContext(IngredientsContext);

  return (
    <section className={`${IngredientsBoardStyle.board} pb-10`}>
      <h2 className="text text_type_main-medium m-0 pb-6">{title}</h2>
      <ul className={`${IngredientsBoardStyle.box} pr-4 pl-4`}>
        {ingredientsData.map(
          (item) =>
            item.type === menu && (
              <li
                className={`${IngredientsBoardStyle.list} pl-4 pr-4 pb-6`}
                key={item._id}
              >
                <button
                  className={IngredientsBoardStyle.button}
                  onClick={() => {
                    onClick(item);
                  }}
                >
                  <Ingredient ingredient={item} />
                </button>
              </li>
            )
        )}
      </ul>
    </section>
  );
};

IngredientsBoard.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientsBoard;
