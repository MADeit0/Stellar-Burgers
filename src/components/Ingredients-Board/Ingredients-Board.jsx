import Ingredient from "../Ingridient/Ingredient.jsx";
import IngredientsBoardStyle from "./Ingredients-Board.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";

const IngredientsBoard = ({ data, title, menu, onClick }) => (
  <section className={`${IngredientsBoardStyle.board} pb-10`}>
    <h2 className="text text_type_main-medium m-0 pb-6">{title}</h2>
    <ul className={`${IngredientsBoardStyle.box} pr-4 pl-4`}>
      {data.map(
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
                <Ingredient ingredient={item} onClick={onClick} />
              </button>
            </li>
          )
      )}
    </ul>
  </section>
);

IngredientsBoard.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
  title: PropTypes.string.isRequired,
  menu: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientsBoard;
