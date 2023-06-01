import IngredientsBoardStyle from "./IngredientsBoard.module.css";
import PropTypes from "prop-types";
import Ingredient from "../Ingredient/Ingredient.jsx";

import { useSelector } from "react-redux";

const IngredientsBoard = ({ title, menu }) => {
  const { ingredients } = useSelector(
    ({ burgerIngredients }) => burgerIngredients
  );

  return (
    <section className={`${IngredientsBoardStyle.board} pb-10`}>
      <h2 className="text text_type_main-medium m-0 pb-6">{title}</h2>
      <ul className={`${IngredientsBoardStyle.box} pr-4 pl-4`}>
        {ingredients.map(
          (item) =>
            item.type === menu && (
              <li
                className={`${IngredientsBoardStyle.list} pl-4 pr-4 pb-6`}
                key={item._id}
              >
                <Ingredient ingredient={item} />
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
};

export default IngredientsBoard;
