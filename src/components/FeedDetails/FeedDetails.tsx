import { useLocation, useParams } from "react-router-dom";
import feedStyle from "./FeedDetails.module.css";
import ScrollBar from "../ScrollBar/ScrollBar";
import { useEffect, useState } from "react";
import { baseUrl, statusDic } from "../../utils/constants";
import axios from "axios";
import { formatDate } from "../../service";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../hooks/hook";
import { FeedsWs, Orders } from "../../store/ws/wsSlice";

type Ingredients = { id: string; count: number }[];
type FeedOrderResponse = Omit<FeedsWs, "total" | "totalToday">;
type FeedOrder = Omit<Orders, "ingredients"> & {
  success: boolean;
  totalSum: number;
  ingredients: Ingredients;
};

const FeedDetails = () => {
  const [order, setOrder] = useState<FeedOrder>();

  const { orderId } = useParams();
  const location = useLocation();
  const ingredientDict = useAppSelector(
    ({ burgerIngredients }) => burgerIngredients.ingredientsDict
  );

  const background = location.state && location.state.background;

  useEffect(() => {
    axios<FeedOrderResponse>(`${baseUrl}/orders/${orderId}/`)
      .then((res) => {
        const { orders, success } = res.data;
        const uniqueIngredients = [...new Set(orders[0].ingredients)];

        const ingredients = uniqueIngredients.map((id) => {
          return {
            id,
            count: orders[0].ingredients.filter((item) => item === id).length,
          };
        });

        const totalSum = ingredients.reduce((acc, ingredient) => {
          const ingredientPrice =
            (ingredientDict && ingredientDict[ingredient.id].price) ?? 0;
          return acc + ingredientPrice * ingredient.count;
        }, 0);

        setOrder((prev) => ({
          ...prev,
          ...orders[0],
          ingredients,
          success: success,
          totalSum: totalSum,
        }));
      })
      .catch((error) => {
        return new Error(error);
      });
  }, [ingredientDict, orderId]);
  return (
    <>
      {order?.success && ingredientDict && (
        <div className={`${feedStyle.container} ${!background && "mt-30"}`}>
          <p className="text text_type_digits-default pt-10 pb-10">{`#${orderId}`}</p>
          <h1
            className={`${feedStyle.indent_left} text text_type_main-medium pb-3`}
          >
            {order.name}
          </h1>
          <p
            className={`${feedStyle.indent_left} text text_type_main-small pb-15`}
            style={{ color: statusDic[order.status].color }}
          >
            {statusDic[order.status].status}
          </p>
          <h2
            className={`${feedStyle.indent_left} text text_type_main-medium pb-6`}
          >
            состав:
          </h2>
          <div className={`${feedStyle.scroll} pb-10`}>
            <ScrollBar maxHeight="256px">
              <ul className={feedStyle.items}>
                {order.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className={feedStyle.item}>
                    <div className={feedStyle.ring}>
                      <img
                        className={feedStyle.img}
                        src={ingredientDict[ingredient.id]?.image_mobile}
                        alt={ingredientDict[ingredient.id]?.name}
                      />
                    </div>
                    <p
                      className={`${feedStyle.name} text text_type_main-default`}
                    >
                      {ingredientDict[ingredient.id]?.name}
                    </p>
                    <div className={`${feedStyle.price} mr-4`}>
                      <span className="text text_type_digits-default">
                        {ingredient.count}&nbsp;x&nbsp;
                        {ingredientDict[ingredient.id]?.price}
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollBar>
          </div>
          <div className={`${feedStyle.date} pb-10`}>
            <time className="text text_type_main-default text_color_inactive">
              {formatDate(order.createdAt)}
            </time>
            <div className={`${feedStyle.price}`}>
              <span className="text text_type_digits-default">
                {order.totalSum}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedDetails;
