import React from "react";
// import PropTypes from 'prop-types';
import Ingredient from "../Ingridient/Ingredient.jsx";

import IngredientsBoardStyle from "./Ingredients-Board.module.css";

const IngredientsBoard = ({ data, title, menu }) => (
  <section className={IngredientsBoardStyle.board}>
    <h2>{title}</h2>
    <ul className={IngredientsBoardStyle.box}>
      {data.map(
        (item) =>
          item.type === menu && (
            <li className={IngredientsBoardStyle.list}>
              <Ingredient {...item} key={item._id} />
            </li>
          )
      )}
    </ul>
  </section>
);

IngredientsBoard.propTypes = {
  // bla: PropTypes.string,
};

IngredientsBoard.defaultProps = {
  // bla: 'test',
};

export default IngredientsBoard;
