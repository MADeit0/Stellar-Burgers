import React from "react";
import burgerConstructorsStyle from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

// import ingredientType from "../../utils/types.js";
import { selectedIngredientsContext } from "../../services/selectedIngredientsContext";

import { IngredientsContext } from "../../services/ingredientsContext";

const BurgerConstructor = ({ bun, onClick }) => {
  const ingredients = React.useContext(IngredientsContext);
  const [constructorBurgersData, setConstructorBurgersData] = React.useContext(
    selectedIngredientsContext
  );

  React.useEffect(() => {
    const bunIngredient = ingredients.find(
      (ingredient) => ingredient.type === bun
    );
    const otherIngredient = ingredients.filter(
      (ingredient) => ingredient.type !== bun
    );

    setConstructorBurgersData([
      ...constructorBurgersData,
      bunIngredient,
      ...otherIngredient,
    ]);
    // eslint-disable-next-line
  }, [bun, ingredients]);

  return (
    <section className={`${burgerConstructorsStyle.board} pt-25`}>
      {constructorBurgersData[0] &&
        (constructorBurgersData[0].type === bun ? (
          <div className="ml-8 pl-4 pr-4">
            <ConstructorElement
              type={"top"}
              isLocked={true}
              text={`${constructorBurgersData[0].name} (верх)`}
              price={constructorBurgersData[0].price}
              thumbnail={constructorBurgersData[0].image_mobile}
            />
          </div>
        ) : (
          <p>выберите булку</p>
        ))}
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {constructorBurgersData.map(
          (item, index) =>
            item.type !== bun && (
              <li
                className={burgerConstructorsStyle.list}
                key={`${item._id}${index}`}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                />
              </li>
            )
        )}
      </ul>
      {constructorBurgersData[0] && constructorBurgersData[0].type === bun && (
        <div className="ml-8 pl-4 pr-4">
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={`${constructorBurgersData[0].name} (низ)`}
            price={constructorBurgersData[0].price}
            thumbnail={constructorBurgersData[0].image_mobile}
          />
        </div>
      )}
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">99999</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={onClick} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  // constructorData: PropTypes.arrayOf(ingredientType).isRequired,
  bun: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
