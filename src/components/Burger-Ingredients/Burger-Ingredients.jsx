import React from "react";
import PropTypes from "prop-types";
import IngredientsBoard from "../Ingredients-Board/Ingredients-Board.jsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from "./Burger-Ingredients.module.css";

const BurgerIngredients = ({ ingredientslist }) => {
  const [current, setCurrent] = React.useState("one");
  return (
    <section
      className={`${ingredientsStyle.board} pt-10`}
      aria-label="ингредиенты"
    >
      <h1 className="text text_text text_type_main-large pb-5">
        Соберите бургер
      </h1>
      <div style={{ display: "flex" }}>
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

      <div className={`${ingredientsStyle.scroll} mt-10`}>
        <IngredientsBoard title="Булки" menu="bun" data={ingredientslist} />
        <IngredientsBoard title="Соусы" menu="sauce" data={ingredientslist} />
        <IngredientsBoard title="Начинки" menu="main" data={ingredientslist} />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredientslist: PropTypes.array.isRequired,
};

export default BurgerIngredients;
