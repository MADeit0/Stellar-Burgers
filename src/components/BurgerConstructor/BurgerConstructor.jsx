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

const BurgerConstructor = ({ menu, onClick }) => {
  const constructorData = React.useContext(selectedIngredientsContext);

  return (
    <section className={`${burgerConstructorsStyle.board} pt-25`}>
      {constructorData[0].type === menu ? (
        <div className="ml-8 pl-4 pr-4">
          <ConstructorElement
            type={"top"}
            isLocked={true}
            text={`${constructorData[0].name} (верх)`}
            price={constructorData[0].price}
            thumbnail={constructorData[0].image_mobile}
          />
        </div>
      ) : (
        <p>выберите булку</p>
      )}
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {constructorData.map(
          (item, index) =>
            item.type !== menu && (
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
      {constructorData[0].type === menu && (
        <div className="ml-8 pl-4 pr-4">
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={`${constructorData[0].name} (низ)`}
            price={constructorData[0].price}
            thumbnail={constructorData[0].image_mobile}
          />
        </div>
      )}
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">167890</p>
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
  menu: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
