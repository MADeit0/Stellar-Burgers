import burgerConstructorsStyle from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import { postConstructorData } from "../../store/orderDetails/orderDetailsSlice";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { openOrderModal } from "../../store/modal/modalSlice";

import { useDispatch, useSelector } from "react-redux";

const BurgerConstructor = ({ bun }) => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector(
    ({ burgerIngredients }) => burgerIngredients
  );

  const handleOpenModal = () => {
    dispatch(openOrderModal());
    dispatch(postConstructorData("643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093f","643d69a5c3f7b9001cfa093c"))
  };

  return (
    <section className={`${burgerConstructorsStyle.board} pt-25`}>
      {ingredients[0] &&
        (ingredients[0].type === bun ? (
          <div className="ml-8 pl-4 pr-4">
            <ConstructorElement
              type={"top"}
              isLocked={true}
              text={`${ingredients[0].name} (верх)`}
              price={ingredients[0].price}
              thumbnail={ingredients[0].image_mobile}
            />
          </div>
        ) : (
          <p>выберите булку</p>
        ))}
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {ingredients.map(
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
      {ingredients[0] && ingredients[0].type === bun && (
        <div className="ml-8 pl-4 pr-4">
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={`${ingredients[0].name} (низ)`}
            price={ingredients[0].price}
            thumbnail={ingredients[0].image_mobile}
          />
        </div>
      )}
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">100</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleOpenModal}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  bun: PropTypes.string.isRequired,
};

export default BurgerConstructor;
