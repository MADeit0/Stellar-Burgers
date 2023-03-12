import done from "../../images/done.png";
// import PropTypes from 'prop-types';

const OrderDetails = () => (
  <>
    <h3 className="text text_type_digits-large pt-30 pb-8">034536</h3>
    <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
    <img src={done} alt="" />
    <p className="text text_type_main-small pt-15 pb-2">
      Ваш заказ начали готовить
    </p>
    <p className="text text_type_main-default text_color_inactive pb-30">
      Дождитесь готовности на орбитальной станции
    </p>
  </>
);

OrderDetails.propTypes = {
  // bla: PropTypes.string,
};

export default OrderDetails;
