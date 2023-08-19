import ingredientStyle from "./Ingredient.module.css";
import { Tingredient } from "../../utils/types";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ItemTypes } from "../../utils/constants";
import { DragPreviewImage, useDrag } from "react-dnd";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";

interface ingredientProps {
  ingredient: Tingredient;
}

const Ingredient = ({ ingredient }: ingredientProps) => {
  const location = useLocation();
  const { name, price, image, _id } = ingredient;
  const [count, setCount] = useState(0);
  const { otherStuffings, bunUp, bunDown } = useAppSelector(
    ({ burgerConstructor }) => burgerConstructor
  );

  useEffect(() => {
    const stuffings = [bunUp, ...otherStuffings, bunDown];
    const sum = stuffings.filter((item) => item && item._id === _id).length;
    setCount(sum);
  }, [otherStuffings, bunUp, bunDown, _id]);

  const [{ isDrag }, dragRef, preview] = useDrag({
    type: ItemTypes.INGREDIENTS,
    item: { _id },
    collect: (monitor) => ({
      isDrag: !!monitor.isDragging(),
    }),
  });

  return (
    <Link
      to={`/ingredients/${_id}`}
      state={{ background: location }}
      className={ingredientStyle.button}
    >
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
      {!!count && (
        <Counter
          count={count}
          size="default"
          extraClass={`m-1 ${ingredientStyle.count}`}
        />
      )}
    </Link>
  );
};

export default Ingredient;
