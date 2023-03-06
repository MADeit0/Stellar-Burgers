import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorsStyle from "./Burger-Constructor.module.css";
import PropTypes from "prop-types";

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_mobile: PropTypes.string.isRequired,
});

const BurgerConstructor = ({ ingredientslist }) => {
  return (
    <section className={`${burgerConstructorsStyle.board} pt-25`}>
      <div className="ml-8 pl-4 pr-4">
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={ingredientslist[0].name}
          price={ingredientslist[0].price}
          thumbnail={ingredientslist[0].image_mobile}
        />
      </div>
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {ingredientslist.map(
          (item, element) =>
            element > 0 && (
              <li className={burgerConstructorsStyle.list} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                />
              </li>
            )
        )}
      </ul>
      <div className="ml-8 pl-4 pr-4">
        <ConstructorElement
          type={"bottom"}
          isLocked={true}
          text={ingredientslist[0].name}
          price={ingredientslist[0].price}
          thumbnail={ingredientslist[0].image_mobile}
        />
      </div>
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">167890</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredientslist: PropTypes.arrayOf(dataPropTypes).isRequired,
};

export default BurgerConstructor;
