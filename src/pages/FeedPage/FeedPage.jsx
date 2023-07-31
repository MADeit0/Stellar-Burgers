import feedStyle from "./FeedPage.module.css";
import OrderElement from "../../components/OrderElement/OrderElement";
import ScrollBar from "../../components/ScrollBar/ScrollBar";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import CompletedOrdersBoard from "../../components/CompletedOrdersBoard/CompletedOrdersBoard";
import { Link, useLocation } from "react-router-dom";
import { wsFeedsActions } from "../../store/ws/wsSlice";
import { wsUrl } from "../../utils/constants";



const getOrdersStatus = (ordersList, status) => {
  const statusList = ordersList?.filter((list) => list.status === status);
  if (statusList && statusList.length > 20) {
    return statusList.slice(0, 20);
  }
  return statusList;
};

const FeedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const ordersList = useSelector(({ wsFeeds }) => wsFeeds.data?.orders);
  const success = useSelector(({ wsFeeds }) => wsFeeds.data?.success);
  const total = useSelector(({ wsFeeds }) => wsFeeds.data?.total);
  const totalToday = useSelector(({ wsFeeds }) => wsFeeds.data?.totalToday);

  useLayoutEffect(() => {
    dispatch(wsFeedsActions.actions.startConnecting(`${wsUrl}/all`));
    return () => {
      dispatch(wsFeedsActions.actions.disconnect());
    };
    //eslint-disable-next-line
  }, []);

  const ordersDone = getOrdersStatus(ordersList, "done");
  const ordersPending = getOrdersStatus(ordersList, "pending");

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

            <ScrollBar maxHeight="66.4vh">
              {ordersList.map((order) => (
                <Link
                  to={`/feed/${order.number}`}
                  state={{ background: location }}
                  className={feedStyle.link}
                  key={order._id}
                >
                  <OrderElement
                    wsSuccess={success}
                    ingredients={order.ingredients}
                    number={order.number}
                    name={order.name}
                    createdAt={order.createdAt}
                  />
                </Link>
              ))}
            </ScrollBar>
          </section>
          <CompletedOrdersBoard
            total={total}
            totalToday={totalToday}
            wsSuccess={success}
            ordersDone={ordersDone}
            ordersPending={ordersPending}
          />
        </div>
      </>
    )
  );
};

export default FeedPage;
