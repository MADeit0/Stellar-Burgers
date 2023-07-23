import feedStyle from "./FeedPage.module.css";
import OrderElement from "../../components/OrderElement/OrderElement";
import ScrollBar from "../../components/ScrollBar/ScrollBar";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { wsFeedsActions } from "../../store/wsFeeds/wsFeedsSlice";
import { nanoid } from "@reduxjs/toolkit";

const FeedPage = () => {
  const dispatch = useDispatch();

  const ordersList = useSelector(({ wsFeeds }) => wsFeeds.data?.orders);
  const success = useSelector(({ wsFeeds }) => wsFeeds.data?.success);

  useLayoutEffect(() => {
    dispatch(wsFeedsActions.startConnecting());
    // eslint-disable-next-line
  }, []);

  return (
    success && (
      <>
        <div className={feedStyle.section}>
          <section
            className={`${feedStyle.board} pt-10`}
            aria-label="ингредиенты"
          >
            <h1 className="text text_text text_type_main-large pb-5">
              Лента заказов
            </h1>

            <ScrollBar>
              {ordersList.map((order) => (
                <OrderElement
                  key={nanoid()}
                  wsSuccess={success}
                  ingredients={order.ingredients}
                  // status={order.status}
                  number={order.number}
                  name={order.name}
                  createdAt={order.createdAt}
                />
              ))}
            </ScrollBar>
          </section>
        </div>
      </>
    )
  );
};

export default FeedPage;
