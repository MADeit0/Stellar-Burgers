// import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Ingridient = ({ name, price, image }) => {
  return (
    <li>
      <img src={image} alt={name} />
      <div>
        <span>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p>{name}</p>
      <Counter count={1} size="default" extraClass="m-1" />
    </li>
  );
};

Ingridient.propTypes = {
  // bla: PropTypes.string,
};

Ingridient.defaultProps = {
  // bla: 'test',
};

export default Ingridient;
