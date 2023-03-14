import React from "react";
import AppHeader from "../App-Header/App-Header.jsx";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients.jsx";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor.jsx";
import appStyle from "./App.module.css";
import Api from "../../utils/Api.js";
import OrderDetails from "../Order-Details/Order-Details.jsx";
import IngredientDetails from "../Ingredient-Details/Ingredient-Details.jsx";
import { baseUrl } from "../../utils/constants.js";

import Modal from "../Modal/Modal.jsx";

const api = new Api(baseUrl);

function App() {
  const [ingredientsData, setIngredientsData] = React.useState([]);
  const [showOpenOrderDetails, setShowOpenOrderDetails] = React.useState(false);
  const [showOpenIngredientDetails, setShowOpenIngredientDetails] =
    React.useState(false);
  const [nutritionalValue, setNutritionalValue] = React.useState([]);

  React.useEffect(() => {
    api
      .getIngredients()
      .then((ingredients) => {
        setIngredientsData(ingredients.data);
      })
      .catch((err) => api.isRejected(err));
  }, []);

  const handleIngredientData = React.useCallback((data) => {
    setNutritionalValue(data);
    setShowOpenIngredientDetails(true);
  }, []);

  return (
    <div className={`${appStyle.container} pb-10`}>
      <AppHeader />
      <main className={appStyle.section}>
        <BurgerIngredients
          ingredientslist={ingredientsData}
          onClick={handleIngredientData}
        />
        <BurgerConstructor
          onClick={() => {
            setShowOpenOrderDetails(true);
          }}
          ingredientslist={ingredientsData}
          menu="bun"
        />
      </main>
      {showOpenOrderDetails && (
        <Modal
          onClose={() => {
            setShowOpenOrderDetails(false);
          }}
        >
          <OrderDetails />
        </Modal>
      )}
      {showOpenIngredientDetails && (
        <Modal
          onClose={() => {
            setShowOpenIngredientDetails(false);
          }}
        >
          <IngredientDetails ingredient={nutritionalValue} />
        </Modal>
      )}
    </div>
  );
}

export default App;
