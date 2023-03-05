import React from "react";
// import PropTypes from 'prop-types';
import Ingredient from "../Ingridient/Ingredient.jsx";

import IngredientsBoardStyle from "./Ingredients-Board.module.css";

const IngredientsBoard = ({ data, title, menu }) => (
  <section className={`${IngredientsBoardStyle.board} pb-10`}>
    <h2 className="text text_type_main-defaul m-0 pb-6">{title}</h2>
    <ul className={`${IngredientsBoardStyle.box} pr-4 pl-4`}>
      {data.map(
        (item) =>
          item.type === menu && (
            <li
              className={`${IngredientsBoardStyle.list} pl-4 pr-4 pb-6`}
              key={item._id}
            >
              <Ingredient {...item} />
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
