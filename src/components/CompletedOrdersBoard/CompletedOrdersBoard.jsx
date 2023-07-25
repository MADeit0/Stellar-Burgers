import { nanoid } from "@reduxjs/toolkit";
import boardStyle from "./CompletedOrdersBoard.module.css";

const CompletedOrdersBoard = ({
  total,
  totalToday,
  wsSuccess,
  ordersDone,
  ordersPending,
}) => {
  return (
    wsSuccess && (
      <section className={`pt-30 ${boardStyle.container}`}>
        <div className={boardStyle.table}>
          <div>
            <p className="text text_type_main-medium pb-6">Готовы:</p>
            <ul className={boardStyle.orders} style={{ color: "#0cc" }}>
              {ordersDone.map((order) => (
                <li className="text text_type_digits-default" key={nanoid()}>
                  {order.number}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text text_type_main-medium pb-6">В работе:</p>
            <ul className={boardStyle.orders}>
              {ordersPending.map((order) => (
                <li className="text text_type_digits-default" key={nanoid()}>
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
    )
  );
};

CompletedOrdersBoard.defaultProps = {
  total: null,
  totalToday: null,
  wsSuccess: false,
  ordersDone:[],
  ordersPending: []
};

export default CompletedOrdersBoard;
