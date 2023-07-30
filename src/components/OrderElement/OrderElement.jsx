import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyle from "./OrderElement.module.css";
import { useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { formatDate } from "../../service";
import PropTypes from "prop-types";
import { statusDic } from "../../utils/constants";

const OrderElement = ({
  wsSuccess,
  ingredients,
  status,
  number,
  name,
  createdAt,
}) => {
  const [totalSum, setTotalSum] = useState(0);
  const ingredientDict = useSelector(
    ({ burgerIngredients }) => burgerIngredients.ingredientsDict
  );

  useLayoutEffect(() => {
    const total = ingredients.reduce(
      (acc, id) => acc + ingredientDict[id]?.price,
      0
    );
    setTotalSum(total);
    // eslint-disable-next-line
  }, []);

  return (
    wsSuccess && (
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
          <span className="text text_type_digits-default">{totalSum}</span>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    )
  );
};

OrderElement.defaultProps = {
  ingredients: null,
  wsSuccess: false,
  status: "",
  number: "",
  name: "",
  createdAt: "",
};

OrderElement.propTypes = {
  ingredients: PropTypes.array.isRequired,
  wsSuccess: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default OrderElement;
