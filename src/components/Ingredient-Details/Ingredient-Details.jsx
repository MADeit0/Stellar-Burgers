import ingredientStyle from "./Ingredient-Details.module.css";
import ingredientType from "../../utils/types.js";

const IngredientDetails = ({ ingredient }) => {
  const { name, calories, proteins, fat, image_large, carbohydrates } =
    ingredient;

  const textStyle = "text text_type_main-default text_color_inactive";

  return (
    <>
      <h3
        className={`${ingredientStyle.title} text text text_type_main-large pt-10`}
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
    </>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientDetails;
