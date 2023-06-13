import ingredientStyle from "./Ingredient.module.css";
import ingredientType from "../../utils/types.js";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ItemTypes } from "../../utils/constants";
import { openIngredientDetailsModal } from "../../store/modal/modalSlice";
import { getDetailsIngredient } from "../../store/ingredientDetails/ingredientDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useEffect, useState } from "react";

const Ingredient = ({ ingredient }) => {
  const { name, price, image, _id } = ingredient;
  const [count, setCount] = useState("");
  const dispatch = useDispatch();
  const { otherStuffings, bunUp, bunDown } = useSelector(
    ({ burgerConstructor }) => burgerConstructor
  );

  useEffect(() => {
    const stuffings = [bunUp, ...otherStuffings, bunDown];
    const sum = stuffings.filter((item) => item._id === _id).length;
    setCount(sum);
  }, [otherStuffings, bunUp, bunDown, _id]);

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
      {!!count &&<Counter count={count} size="default" extraClass={`m-1 ${ingredientStyle.count}` }/>}
    </button>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default Ingredient;
