import ingredientStyle from "./Ingredient.module.css";
import ingredientType from "../../utils/types.js";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ItemTypes } from "../../utils/constants";
import { openIngredientDetailsModal } from "../../store/modal/modalSlice";
import { getDetailsIngredient } from "../../store/ingredientDetails/ingredientDetailsSlice";
import { useDispatch } from "react-redux";
import { DragPreviewImage, useDrag } from "react-dnd";

const Ingredient = ({ ingredient }) => {
  const { name, price, image, _id } = ingredient;

  const dispatch = useDispatch();

  const [{ isDrag }, dragRef, preview] = useDrag({
    type: ItemTypes.INGREDIENTS,
    item: { _id },
    collect: (monitor) => ({
      isDrag: !!monitor.isDragging(),
    }),
  });

  const handleOpenModal = () => {
    dispatch(getDetailsIngredient(ingredient));
    dispatch(openIngredientDetailsModal());
  };

  return (
    <button className={ingredientStyle.button} onClick={handleOpenModal}>
      <DragPreviewImage connect={preview} src={image} />
      <img
        ref={dragRef}
        className={`${ingredientStyle.pic} ${
          isDrag && ingredientStyle.pic__gray
        }`}
        src={image}
        alt={name}
      />
      <div className="mt-1 mb-1">
        <span className={`text text_type_digits-default mr-2`}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={` ${ingredientStyle.text} text text_type_main-default`}>
        {name}
      </p>
      <Counter count={9} size="default" extraClass="m-1" />
    </button>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default Ingredient;
