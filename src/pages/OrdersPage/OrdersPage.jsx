import ordersStyle from "./OrdersPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import ScrollBar from "../../components/ScrollBar/ScrollBar";
import OrderElement from "../../components/OrderElement/OrderElement";
import { nanoid } from "@reduxjs/toolkit";
import { useLayoutEffect } from "react";
import { wsOrdersActions } from "../../store/wsOrders/wsOrdersSlice";
import { Link, useLocation } from "react-router-dom";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const ordersList = useSelector(({ wsOrders }) => wsOrders.data?.orders);
  const success = useSelector(({ wsOrders }) => wsOrders.data?.success);

  useLayoutEffect(() => {
    dispatch(wsOrdersActions.startConnecting());
    return () => {
      dispatch(wsOrdersActions.disconnect());
    };
    //eslint-disable-next-line
  }, []);

  return (
    success && (
      <div className={ordersStyle.container}>
        <ScrollBar maxHeight="66.4vh">
          {ordersList
            .map((order) => (
              <Link
                to={`/profile/orders/${order.number}`}
                state={{ background: location }}
                className={ordersStyle.link}
                key={nanoid()}
              >
                <OrderElement
                  wsSuccess={success}
                  ingredients={order.ingredients}
                  status={order.status}
                  number={order.number}
                  name={order.name}
                  createdAt={order.createdAt}
                />
              </Link>
            ))
            .reverse()}
        </ScrollBar>
      </div>
    )
  );
}
