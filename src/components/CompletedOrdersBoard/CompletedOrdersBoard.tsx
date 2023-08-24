import { Orders } from "../../store/ws/wsSlice";
import boardStyle from "./CompletedOrdersBoard.module.css";

interface CompletedOrdersBoardProps {
  total: number;
  totalToday: number;
  wsSuccess: boolean;
  ordersDone:  Orders[];
  ordersPending:  Orders[];
}

const CompletedOrdersBoard = ({
  total = 0,
  totalToday = 0,
  wsSuccess = false,
  ordersDone,
  ordersPending,
}: CompletedOrdersBoardProps) => {
  return (
    <>
      {wsSuccess && (
        <section className={`pt-25 ${boardStyle.container}`}>
          <div className={boardStyle.table}>
            <div>
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <ul className={boardStyle.orders} style={{ color: "#0cc" }}>
                {ordersDone.map((order) => (
                  <li className="text text_type_digits-default" key={order._id}>
                    {order.number}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <ul className={boardStyle.orders}>
                {ordersPending.map((order) => (
                  <li className="text text_type_digits-default" key={order._id}>
                    {order.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="text text_type_main-medium pb-6">
              Выполнено за все время:
            </p>
            <p className="orders-info_digits__eG1lj text text_type_digits-large">
              {total}
            </p>
          </div>
          <div>
            <p className="text text_type_main-medium pb-6">
              Выполнено за сегодня:
            </p>
            <p className="orders-info_digits__eG1lj text text_type_digits-large">
              {totalToday}
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default CompletedOrdersBoard;
