import burgerConstructorsStyle from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorCard from "../ConstructorCard/ConstructorCard";

import { ItemTypes, ingredientsMenu } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import { postConstructorData } from "../../store/orderDetails/orderDetailsSlice";
import { openOrderModal } from "../../store/modal/modalSlice";
import {
  addIngredient,
  addBun,
} from "../../store/burgerConstructor/burgerConstructorSlice";

const { BUN } = ingredientsMenu;

const BurgerConstructor = () => {
  const [totalSum, setTotalSum] = useState(0);
  const dispatch = useDispatch();

  const ingredients = useSelector(
    ({ burgerIngredients }) => burgerIngredients.ingredients
  );
  const { otherStuffings, bunUp, bunDown, isBun } = useSelector(
    ({ burgerConstructor }) => burgerConstructor
  );

  const [{ isHover }, dropRef] = useDrop({
    accept: ItemTypes.INGREDIENTS,
    collect: (monitor) => ({
      isHover: !!monitor.isOver(),
    }),
    drop(itemId) {
      const menu = ingredients.find((item) => item._id === itemId._id);

      menu.type === BUN
        ? dispatch(addBun(menu))
        : dispatch(addIngredient(menu));
    },
  });

  useEffect(() => {
    const price = [bunUp, ...otherStuffings, bunDown];
    const total = price.reduce((acc, cur) => acc + cur.price, 0) || 0;
    setTotalSum(total);
  }, [otherStuffings, bunUp, bunDown]);

  const handleOpenModal = () => {
    dispatch(openOrderModal());
    dispatch(postConstructorData([bunUp, ...otherStuffings, bunDown]));
  };

  return (
    <section
      ref={dropRef}
      className={`${isHover && burgerConstructorsStyle.border} ${
        burgerConstructorsStyle.board
      } pt-25`}
    >
      {bunUp &&
        (bunUp.type === BUN ? (
          <div className="ml-8 pl-4 pr-6">
            <ConstructorElement
              type={"top"}
              isLocked={true}
              text={`${bunUp.name} (верх)`}
              price={bunUp.price}
              thumbnail={bunUp.image_mobile}
            />
          </div>
        ) : (
          <p>выберите булку</p>
        ))}
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {otherStuffings.map(
          (item, i) =>
            item.type !== BUN && (
              <ConstructorCard
                name={item.name}
                price={item.price}
                image={item.image_mobile}
                fakeId={item.fakeId}
                key={item.fakeId}
                index={i}
              />
            )
        )}
      </ul>
      {bunDown && bunDown.type === BUN && (
        <div className="ml-8 pl-4 pr-6">
          <ConstructorElement
            type={"bottom"}
            isLocked={true}
            text={`${bunDown.name} (низ)`}
            price={bunDown.price}
            thumbnail={bunDown.image_mobile}
          />
        </div>
      )}
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">{totalSum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleOpenModal}
          htmlType="button"
          type="primary"
          size="large"
          disabled={!isBun}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
