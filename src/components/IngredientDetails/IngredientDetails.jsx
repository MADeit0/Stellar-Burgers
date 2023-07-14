import ingredientStyle from "./IngredientDetails.module.css";

import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const textStyle = "text text_type_main-default text_color_inactive";

const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const location = useLocation();

  const details = useSelector(({ burgerIngredients }) =>
    burgerIngredients.ingredients.find((item) => item._id === ingredientId)
  );
  const { name, calories, proteins, fat, image_large, carbohydrates } =
    details || "";

  const background = location.state && location.state.background;

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
          <img width="480" height="240" alt={name} src={image_large} />
          <p className="text text_type_main-medium pt-4 pb-8">{name}</p>
          <ul className={`${ingredientStyle.table} pb-15`}>
            <li className={ingredientStyle.list}>
              <p className={textStyle}>Калории,ккал</p>
              <p className={textStyle}>{calories}</p>
            </li>
            <li className={ingredientStyle.list}>
              <p className={textStyle}>Белки, г</p>
              <p className={textStyle}>{proteins}</p>
            </li>
            <li className={ingredientStyle.list}>
              <p className={textStyle}>Жиры, г</p>
              <p className={textStyle}>{fat}</p>
            </li>
            <li className={ingredientStyle.list}>
              <p className={textStyle}>Углеводы, г</p>
              <p className={textStyle}>{carbohydrates}</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default IngredientDetails;
