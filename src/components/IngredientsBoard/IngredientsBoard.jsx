import IngredientsBoardStyle from "./IngredientsBoard.module.css";
import PropTypes from "prop-types";
import Ingredient from "../Ingredient/Ingredient.jsx";

import { useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";

const IngredientsBoard = forwardRef(
  ({ title, menu, isView, setState, active }, ref) => {
    const ingredients = useSelector(
      ({ burgerIngredients }) => burgerIngredients.ingredients
    );

    useEffect(() => {
      isView && setState(menu);
      // eslint-disable-next-line
    }, [isView]);

    return (
      <section className={`${IngredientsBoardStyle.board} pb-10`}>
        <h2 ref={ref} className="text text_type_main-medium m-0 pb-6">
          {title}
        </h2>
        <ul className={`${IngredientsBoardStyle.box} pr-4 pl-4`}>
          {ingredients.map(
            (item) =>
              item.type === menu && (
                <li
                  className={`${IngredientsBoardStyle.list} pl-4 pr-4 pb-6 ${
                    !active && IngredientsBoardStyle.pic__gray
                  }`}
                  key={item._id}
                >
                  <Ingredient ingredient={item} />
                </li>
              )
          )}
        </ul>
      </section>
    );
  }
);

IngredientsBoard.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.string.isRequired,
  isView: PropTypes.bool.isRequired,
  setState: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default IngredientsBoard;
