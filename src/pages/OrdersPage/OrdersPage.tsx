import ordersStyle from "./OrdersPage.module.css";
import ScrollBar from "../../components/ScrollBar/ScrollBar";
import OrderElement from "../../components/OrderElement/OrderElement";
import { useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { wsOrdersSlice } from "../../store/ws/wsSlice";
import { token, wsUrl } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";

const { startConnecting, disconnect } = wsOrdersSlice.actions;

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const ordersList = useAppSelector(({ wsOrders }) => wsOrders.data?.orders);
  const success = useAppSelector(({ wsOrders }) => wsOrders.data?.success);

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem(token.ACCESS_TOKEN);

    if (accessToken) {
      dispatch(
        startConnecting(`${wsUrl}?token=${accessToken.replace("Bearer ", "")}`)
      );
    }
    return () => {
      dispatch(disconnect());
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {success && (
        <div className={ordersStyle.container}>
          <ScrollBar maxHeight="66.4vh">
            {ordersList &&
              ordersList
                .map((order) => (
                  <Link
                    to={`/profile/orders/${order.number}`}
                    state={{ background: location }}
                    className={ordersStyle.link}
                    key={order._id}
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
      )}
    </>
  );
};

export default OrdersPage;
