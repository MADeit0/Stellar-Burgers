import ingredientsStyle from "./BurgerIngredients.module.css";
// import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsBoard from "../IngredientsBoard/IngredientsBoard.jsx";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredientsDetails } from "../../store/burgerIngredients/burgerIngredientsSlice";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");
  const dispatch = useDispatch();
  const { loading } = useSelector(({ burgerIngredients }) => burgerIngredients);

  useEffect(() => {
    dispatch(fetchIngredientsDetails());
  }, [dispatch]);

  return (
    <section
      className={`${ingredientsStyle.board} pt-10`}
      aria-label="ингредиенты"
    >
      <h1 className="text text_text text_type_main-large pb-5">
        Соберите бургер
      </h1>
      <div className={ingredientsStyle.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      {loading === "pending" && (
        <p className="text text_type_main-medium m-0 pb-6">
          Настраиваем антэну...
        </p>
      )}

      {loading === "succeeded" && (
        <div className={`${ingredientsStyle.scroll} mt-10`}>
          <IngredientsBoard title="Булки" menu="bun" />
          <IngredientsBoard title="Соусы" menu="sauce" />
          <IngredientsBoard title="Начинки" menu="main" />
        </div>
      )}

      {loading === "failed" && (
        <p className="text text_type_main-medium m-0 pb-6">
          Упс... Что-то сломалось.
        </p>
      )}
    </section>
  );
};

// BurgerIngredients.propTypes = {
//   handleIngredientData: PropTypes.func.isRequired,
// };

export default BurgerIngredients;
