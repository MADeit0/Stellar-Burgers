import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import burgerConstructorsStyle from "./Burger-Constructor.module.css";
// import PropTypes from 'prop-types';

const BurgerConstructor = ({ ingredientslist }) => {
  return (
    <section className={`${burgerConstructorsStyle.board} pt-25 pl-4 pr-4`}>
      <div className="ml-8">
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={ingredientslist[0].name}
          price={ingredientslist[0].price}
          thumbnail={ingredientslist[0].image}
        />
      </div>
      <ul className={burgerConstructorsStyle.lists}>
        {ingredientslist.map(
          (item, element) =>
            element > 0 && (
              <li className={burgerConstructorsStyle.list} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            )
        )}
      </ul>
      <div className="ml-8">
        <ConstructorElement
          type={"bottom"}
          isLocked={true}
          text={ingredientslist[0].name}
          price={ingredientslist[0].price}
          thumbnail={ingredientslist[0].image}
        />
      </div>
      <div className={`${burgerConstructorsStyle.price} pt-10`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">167890</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  // bla: PropTypes.string,
};

BurgerConstructor.defaultProps = {
  // bla: 'test',
};

export default BurgerConstructor;
