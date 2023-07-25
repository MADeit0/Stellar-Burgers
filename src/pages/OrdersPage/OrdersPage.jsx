import ordersStyle from "./OrdersPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { wsFeedsActions } from "../../store/wsFeeds/wsFeedsSlice";
import ScrollBar from "../../components/ScrollBar/ScrollBar";
import OrderElement from "../../components/OrderElement/OrderElement";
import { nanoid } from "@reduxjs/toolkit";
import { useLayoutEffect } from "react";

export default function OrdersPage() {
  const dispatch = useDispatch();

  const ordersList = useSelector(({ wsFeeds }) => wsFeeds.data?.orders);
  const success = useSelector(({ wsFeeds }) => wsFeeds.data?.success);

  useLayoutEffect(() => {
    dispatch(wsFeedsActions.startConnecting());
    // eslint-disable-next-line
  }, []);

  return (
    <div className={ordersStyle.container}>
      <ScrollBar>
        {ordersList.map((order) => (
          <OrderElement
            key={nanoid()}
            wsSuccess={success}
            ingredients={order.ingredients}
            status={order.status}
            number={order.number}
            name={order.name}
            createdAt={order.createdAt}
          />
        ))}
      </ScrollBar>
    </div>
  );
}
