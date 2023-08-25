import feedStyle from "./FeedPage.module.css";
import OrderElement from "../../components/OrderElement/OrderElement";
import ScrollBar from "../../components/ScrollBar/ScrollBar";
import { useLayoutEffect } from "react";
import CompletedOrdersBoard from "../../components/CompletedOrdersBoard/CompletedOrdersBoard";
import { Link, useLocation } from "react-router-dom";
import { wsFeedsSlice } from "../../store/ws/wsSlice";
import { wsUrl } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { Orders } from "../../utils/types";

const { startConnecting, disconnect } = wsFeedsSlice.actions;

/**
 * Возвращает список заказов с указанным статусом.
 * @param {Orders[] | undefined} ordersList Список заказов.
 * @param {string} status Статус заказов для фильтрации.
 * @returns {Orders[]} Отфильтрованный список заказов.
 */
const getOrdersStatus = (
  ordersList: Orders[] | undefined,
  status: string
): Orders[] => {
  const statusList = ordersList?.filter((list) => list.status === status) ?? [];
  if (statusList && statusList.length > 20) {
    return statusList.slice(0, 20);
  }
  return statusList;
};

const FeedPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const ordersList = useAppSelector(({ wsFeeds }) => wsFeeds.data?.orders);
  const success = useAppSelector(({ wsFeeds }) => wsFeeds.data?.success);
  const total = useAppSelector(({ wsFeeds }) => wsFeeds.data?.total);
  const totalToday = useAppSelector(({ wsFeeds }) => wsFeeds.data?.totalToday);

  useLayoutEffect(() => {
    dispatch(startConnecting(`${wsUrl}/all`));
    return () => {
      dispatch(disconnect());
    };
    //eslint-disable-next-line
  }, []);

  const ordersDone = getOrdersStatus(ordersList, "done");
  const ordersPending = getOrdersStatus(ordersList, "pending");

  return (
    <>
      {success && (
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
                {ordersList &&
                  ordersList.map((order) => (
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
              total={total ?? 0}
              totalToday={totalToday ?? 0}
              wsSuccess={success}
              ordersDone={ordersDone}
              ordersPending={ordersPending}
            />
          </div>
        </>
      )}
    </>
  );
};

export default FeedPage;
