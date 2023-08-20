import ingredientStyle from "./IngredientDetails.module.css";

import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hook";

const textStyle = "text text_type_main-default text_color_inactive";

const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const location = useLocation();

  const ingredientDict = useAppSelector(
    ({ burgerIngredients }) => burgerIngredients.ingredientsDict
  );

  const background = location.state && location.state.background;

  const details =
    ingredientId !== undefined &&
    ingredientDict &&
    ingredientDict[ingredientId];

  return (
    <>
      {details && (
        <div
          className={`${ingredientStyle.container} ${!background && "mt-30"}`}
        >
          <h3
            className={`${
              background && ingredientStyle.title
            } text text text_type_main-large pt-10`}
          >
            Детали ингредиента
          </h3>
          <img
            width="480"
            height="240"
            alt={details.name}
            src={details.image_large}
          />
          <p className="text text_type_main-medium pt-4 pb-8">{details.name}</p>
          <ul className={`${ingredientStyle.table} pb-15`}>
            <li className={ingredientStyle.list}>
              <p className={textStyle}>Калории,ккал</p>
              <p className={textStyle}>{details.calories}</p>
            </li>
            <li className={ingredientStyle.list}>
              <p className={textStyle}>Белки, г</p>
              <p className={textStyle}>{details.proteins}</p>
            </li>
            <li className={ingredientStyle.list}>
              <p className={textStyle}>Жиры, г</p>
              <p className={textStyle}>{details.fat}</p>
            </li>
            <li className={ingredientStyle.list}>
              <p className={textStyle}>Углеводы, г</p>
              <p className={textStyle}>{details.carbohydrates}</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default IngredientDetails;
