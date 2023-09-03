import burgerConstructorsStyle from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorCard from "../ConstructorCard/ConstructorCard";

import { ItemTypes, ingredientsMenu } from "../../utils/constants";
import { useEffect, useState } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";

import { postConstructorData } from "../../store/orderDetails/orderDetailsAction";
import { isOpenedOrderModal } from "../../store/modal/modalSlice";
import {
  addIngredient,
  addBun,
} from "../../store/burgerConstructor/burgerConstructorSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { Tingredient } from "../../utils/types";

const { BUN } = ingredientsMenu;

const BurgerConstructor = () => {
  const [totalSum, setTotalSum] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ingredientDict = useAppSelector(
    ({ burgerIngredients }) => burgerIngredients.ingredientsDict
  );

  const { otherStuffings, bunUp, bunDown, isBun } = useAppSelector(
    ({ burgerConstructor }) => burgerConstructor
  );
  const isAuthChecked = useAppSelector(({ auth }) => auth.isAuthChecked);
  const user = useAppSelector(({ auth }) => auth.user);

  const [{ isHover }, dropRef] = useDrop({
    accept: ItemTypes.INGREDIENTS,
    collect: (monitor: DropTargetMonitor) => ({
      isHover: !!monitor.isOver(),
    }),
    drop(itemId: Tingredient) {
      if (ingredientDict) {
        const menu = ingredientDict[itemId._id];
        menu.type === BUN
          ? dispatch(addBun(menu))
          : dispatch(addIngredient(menu));
      }
    },
  });

  useEffect(() => {
    const price = [bunUp, ...otherStuffings, bunDown];
    const total = price.reduce((acc, cur) => {
      if (cur) {
        return acc + cur.price;
      }
      return acc;
    }, 0);
    setTotalSum(total);
  }, [otherStuffings, bunUp, bunDown]);

  /**
   * Диспатчит массив объектов и состояние с помощью которого открывается модальное окно,
   *или перенаправляет на страницу входа пользователя
   * @returns {void}
   */
  const handleOpenModal = (): void => {
    if (isAuthChecked && user) {
      dispatch(postConstructorData([bunUp, ...otherStuffings, bunDown]));
      dispatch(isOpenedOrderModal(true));
    } else {
      navigate("/login");
    }
  };

  return (
    <section
      ref={dropRef}
      className={`${isHover && burgerConstructorsStyle.border} ${
        burgerConstructorsStyle.board
      } pt-25`}
    >
      {bunUp && bunUp.type === BUN ? (
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
        <p className="text text_type_main-default">Перетащите булку</p>
      )}

      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {otherStuffings.map(
          (item, i) =>
            item.type !== BUN && (
              <ConstructorCard
                name={item.name}
                price={item.price}
                image={item.image_mobile}
                fakeId={item.fakeId!}
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
          <p className="text text_type_digits-medium">{totalSum || 0}</p>
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
