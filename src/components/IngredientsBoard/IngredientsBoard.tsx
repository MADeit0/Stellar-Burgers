import IngredientsBoardStyle from "./IngredientsBoard.module.css";
import Ingredient from "../Ingredient/Ingredient";

import { useEffect, forwardRef } from "react";
import { useAppSelector } from "../../hooks/hook";

interface IngredientsBoardProps {
  title: string;
  menu: string;
  isView: boolean;
  setState: (param: string) => void;
  active: boolean;
}

const IngredientsBoard = forwardRef<HTMLHeadingElement, IngredientsBoardProps>(
  ({ title, menu, isView, setState, active }, ref) => {
    const ingredientDict = useAppSelector(
      ({ burgerIngredients }) => burgerIngredients.ingredientsDict
    );

    useEffect(() => {
      isView && setState(menu);
      // eslint-disable-next-line
    }, [isView]);

    return (
      <section className={`${IngredientsBoardStyle.board} pb-10`}>
        <h2 ref={ref} className="text text_type_main-medium m-0 pb-6">
          {title}
        </h2>
        <ul className={`${IngredientsBoardStyle.box} pr-4 pl-4`}>
          {ingredientDict &&
            Object.values(ingredientDict).map(
              (item) =>
                item.type === menu && (
                  <li
                    className={`${IngredientsBoardStyle.list} pl-4 pr-4 pb-6 ${
                      !active && IngredientsBoardStyle.pic__gray
                    }`}
                    key={item._id}
                  >
                    <Ingredient ingredient={item} />
                  </li>
                )
            )}
        </ul>
      </section>
    );
  }
);

export default IngredientsBoard;
