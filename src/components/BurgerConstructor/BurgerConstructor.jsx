import burgerConstructorsStyle from "./BurgerConstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ItemTypes, ingredientsMenu } from "../../utils/constants";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import { postConstructorData } from "../../store/orderDetails/orderDetailsSlice";
import { openOrderModal } from "../../store/modal/modalSlice";
import {
  addIngredient,
  addBun,
  deleteIngredient,
} from "../../store/burgerConstructor/burgerConstructorSlice";

const { bun } = ingredientsMenu;

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { ingredients } = useSelector(
    ({ burgerIngredients }) => burgerIngredients
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

      menu.type === bun
        ? dispatch(addBun(menu))
        : dispatch(addIngredient(menu));
    },
  });

  const totalSum = useMemo(() => {
    const price = [bunUp, ...otherStuffings, bunDown];
    return price.reduce((acc, cur) => acc + cur.price, 0) || 0;
  }, [otherStuffings, bunUp, bunDown]);

  const handleOpenModal = () => {
    dispatch(openOrderModal());
    dispatch(postConstructorData([bunUp, ...otherStuffings, bunDown]));
  };

  const onDelete = (id) => {
    dispatch(deleteIngredient(id));
  };

  return (
    <section
      ref={dropRef}
      className={`${isHover && burgerConstructorsStyle.border} ${
        burgerConstructorsStyle.board
      } pt-25`}
    >
      {bunUp &&
        (bunUp.type === bun ? (
          <div className="ml-8 pl-4 pr-4">
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
          (item) =>
            item.type !== bun && (
              <li className={burgerConstructorsStyle.list} key={item.fakeId}>
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                  handleClose={() => onDelete(item.fakeId)}
                />
              </li>
            )
        )}
      </ul>
      {bunDown && bunDown.type === bun && (
        <div className="ml-8 pl-4 pr-4">
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
