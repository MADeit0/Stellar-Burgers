import React from "react";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import appStyle from "./App.module.css";
import Api from "../../utils/Api.js";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
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
      .catch((err) => api.handleError(err));
  }, []);

  const openOrderModal = () => {
    setShowOpenOrderDetails(true);
  };

  const closeOrderModal = () => {
    setShowOpenOrderDetails(false);
  };

  const closeIngredientModal = () => {
    setShowOpenIngredientDetails(false);
  };

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
          onClick={openOrderModal}
          ingredientslist={ingredientsData}
          menu="bun"
        />
      </main>
      {showOpenOrderDetails && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
      {showOpenIngredientDetails && (
        <Modal onClose={closeIngredientModal}>
          <IngredientDetails ingredient={nutritionalValue} />
        </Modal>
      )}
    </div>
  );
}

export default App;
