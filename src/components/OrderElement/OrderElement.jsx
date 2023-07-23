import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyle from "./OrderElement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { wsFeedsActions } from "../../store/wsFeeds/wsFeedsSlice";
import { useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { formatDate } from "./service";

const OrderElement = () => {
  const dispatch = useDispatch();
  ////////////////////////////////
  const ordersList = useSelector(({ wsFeeds }) => wsFeeds.data?.orders[1]);
  const ingredientDict = useSelector(
    ({ burgerIngredients }) => burgerIngredients.ingredientsDict
  );
  const success = useSelector(({ wsFeeds }) => wsFeeds.data?.success);
  const ingredientsList = ordersList?.ingredients || [];

  useEffect(() => {
    dispatch(wsFeedsActions.startConnecting());
  }, []);
  ////////////////////////////////

  return (
    success && (
      <section className={orderStyle.container}>
        <p className={` ${orderStyle.order} text text_type_digits-default`}>
          {`#${ordersList?.number}`}
        </p>
        <p className={` ${orderStyle.title} text text_type_main-medium`}>
          {ordersList?.name}
        </p>
        <p className={`${orderStyle.status} text text_type_main-small`}>
          Создан
        </p>
        <time
          className={` ${orderStyle.date}text text_type_main-default text_color_inactive`}
        >
          {formatDate(ordersList?.createdAt)}
        </time>
        <div className={orderStyle.list}>
          <ul className={orderStyle.items}>
            {ingredientsList.slice(0, 6).map((id, index) => {
              const isManyIngredients =
                index === 5 && ingredientsList.length > 6;
              return (
                <li
                  key={nanoid()}
                  className={index !== 0 ? orderStyle.indent : orderStyle.item}
                  style={{ zIndex: 10 - index }}
                >
                  <img
                    className={
                      isManyIngredients
                        ? orderStyle.inactive
                        : orderStyle.stuffing
                    }
                    src={ingredientDict[id].image_mobile}
                    alt={ingredientDict[id].name}
                  />
                  {isManyIngredients && (
                    <span
                      className={`${orderStyle.count} text text_type_digits-default`}
                    >
                      {`+${ingredientsList.length - index - 1}`}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={orderStyle.price}>
          <span className="text text_type_digits-default">480</span>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    )
  );
};

export default OrderElement;
