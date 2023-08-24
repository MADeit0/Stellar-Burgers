import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyle from "./OrderElement.module.css";
import { useLayoutEffect, useState } from "react";
import { formatDate } from "../../service";
import { statusDic } from "../../utils/constants";
import { useAppSelector } from "../../hooks/hook";
import { StatusWs } from "../../utils/types";

interface OrderElementProps {
  ingredients: string[];
  wsSuccess: boolean;
  status?: StatusWs;
  number: number;
  name: string;
  createdAt: string;
}

const OrderElement = ({
  ingredients,
  wsSuccess = false,
  status = "pending",
  number = 0,
  name,
  createdAt,
}: OrderElementProps) => {
  const [totalSum, setTotalSum] = useState(0);
  const ingredientDict = useAppSelector(
    ({ burgerIngredients }) => burgerIngredients.ingredientsDict
  );

  useLayoutEffect(() => {
    const total = !!ingredientDict
      ? ingredients.reduce((acc, id) => acc + ingredientDict[id]?.price, 0)
      : 0;

    setTotalSum(total);
    // eslint-disable-next-line
  }, []);

  return (
    <>
     { wsSuccess && ingredientDict && (
      <section
        className={status ? orderStyle.container : orderStyle.status_inactive}
      >
        <p className={` ${orderStyle.order} text text_type_digits-default`}>
          {`#${number}`}
        </p>
        <p className={` ${orderStyle.title} text text_type_main-medium`}>
          {name}
        </p>
        {status && (
          <p
            className={`${orderStyle.status} text text_type_main-small`}
            style={{ color: statusDic[status]?.color }}
          >
            {statusDic[status]?.status}
          </p>
        )}

        <time
          className={` ${orderStyle.date}text text_type_main-default text_color_inactive`}
        >
          {formatDate(createdAt)}
        </time>
        <div className={orderStyle.list}>
          <ul className={orderStyle.items}>
            {ingredients.slice(0, 6).map((id, index) => {
              const isManyIngredients = index === 5 && ingredients.length > 6;
              return (
                <li
                  key={index}
                  className={index !== 0 ? orderStyle.indent : orderStyle.item}
                  style={{ zIndex: 10 - index }}
                >
                  <img
                    className={
                      isManyIngredients
                        ? orderStyle.inactive
                        : orderStyle.stuffing
                    }
                    src={ingredientDict[id]?.image_mobile}
                    alt={ingredientDict[id]?.name}
                  />
                  {isManyIngredients && (
                    <span
                      className={`${orderStyle.count} text text_type_main-default`}
                    >
                      {`+${ingredients.length - index - 1}`}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={orderStyle.price}>
          <span className="text text_type_digits-default">
            {totalSum.toString()}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </section>
      )}
    </>
  );
};

export default OrderElement;
