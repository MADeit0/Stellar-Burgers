import ordersStyle from "./OrdersPage.module.css";

import { useDispatch, useSelector } from "react-redux";
import ScrollBar from "../../components/ScrollBar/ScrollBar";
import OrderElement from "../../components/OrderElement/OrderElement";
import { nanoid } from "@reduxjs/toolkit";
import { useLayoutEffect } from "react";
import { wsOrdersActions } from "../../store/wsOrders/wsOrdersSlice";

export default function OrdersPage() {
  const dispatch = useDispatch();

  const ordersList = useSelector(({ wsOrders }) => wsOrders.data?.orders);
  const success = useSelector(({ wsOrders }) => wsOrders.data?.success);

  useLayoutEffect(() => {
    dispatch(wsOrdersActions.startConnecting());
    return () => {
      dispatch(wsOrdersActions.disconnect())
    }
 
  }, [dispatch]);

  return (
    success && <div className={ordersStyle.container}>
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
