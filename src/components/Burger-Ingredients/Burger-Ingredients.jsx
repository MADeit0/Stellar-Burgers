import React from "react";
// import PropTypes from "prop-types";
import IngredientsBoard from "../Ingredients-Board/Ingredients-Board.jsx";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyle from './Burger-Ingredients.module.css'

const BurgerIngredients = ({ ingredientslist }) => {
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={ingredientsStyle.board} aria-label="ингредиенты">
      <h1>Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={ingredientsStyle.scroll}>
        <IngredientsBoard title="Булки" menu="bun" data={ingredientslist} />
        <IngredientsBoard title="Соусы" menu="sauce" data={ingredientslist} />
        <IngredientsBoard title="Начинки" menu="main" data={ingredientslist} />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  // bla: PropTypes.string,
};

BurgerIngredients.defaultProps = {
  // bla: 'test',
};

export default BurgerIngredients;
