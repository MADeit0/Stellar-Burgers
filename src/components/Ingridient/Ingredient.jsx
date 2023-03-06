import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import ingridientStyle from "./Ingredient.module.css";

const Ingridient = ({ name, price, image }) => {
  return (
    <Link className={ingridientStyle.box}>
      <img className={ingridientStyle.pic} src={image} alt={name} />
      <div className="mt-1 mb-1">
        <span className={`text text_type_digits-default mr-2`}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={` ${ingridientStyle.text} text text_type_main-default`}>
        {name}
      </p>
      <Counter count={1} size="default" extraClass="m-1" />
    </Link>
  );
};

Ingridient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default Ingridient;
