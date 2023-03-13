import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorsStyle from "./Burger-Constructor.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";

const BurgerConstructor = ({ ingredientslist, menu, onClick }) => {
  return (
    <section className={`${burgerConstructorsStyle.board} pt-25`}>
      <div className="ml-8 pl-4 pr-4">
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${ingredientslist[0] && ingredientslist[0].name} (верх)`}
          price={ingredientslist[0] && ingredientslist[0].price}
          thumbnail={ingredientslist[0] && ingredientslist[0].image_mobile}
        />
      </div>
      <ul className={`${burgerConstructorsStyle.lists} pl-4 pr-4`}>
        {ingredientslist.map(
          (item) =>
            item.type !== menu && (
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
          text={`${ingredientslist[0] && ingredientslist[0].name} (низ)`}
          price={ingredientslist[0] && ingredientslist[0].price}
          thumbnail={ingredientslist[0] && ingredientslist[0].image_mobile}
        />
      </div>
      <div className={`${burgerConstructorsStyle.price} pt-10 pr-4`}>
        <div className={burgerConstructorsStyle.count}>
          <p className="text text_type_digits-medium">167890</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={onClick} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredientslist: PropTypes.arrayOf(ingredientType).isRequired,
  menu: PropTypes.string.isRequired,
};

export default BurgerConstructor;
