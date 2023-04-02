import appStyle from "./App.module.css";
import React from "react";
import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import Modal from "../Modal/Modal.jsx";

import { IngredientsContext } from "../../services/ingredientsContext";
import { selectedIngredientsContext } from "../../services/selectedIngredientsContext";

import { baseUrl } from "../../utils/constants.js";
import Api from "../../utils/Api.js";

const api = new Api(baseUrl);

function App() {
  const [loading, setLoading] = React.useState(false);
  const [ingredientsData, setIngredientsData] = React.useState([]);
  const constructorBurgersData = React.useState([]);

  const [showOpenOrderDetails, setShowOpenOrderDetails] = React.useState(false);
  const [showOpenIngredientDetails, setShowOpenIngredientDetails] =
    React.useState(false);
  const [nutritionalValue, setNutritionalValue] = React.useState([]);

  React.useEffect(() => {
    api
      .getIngredients()
      .then((ingredients) => {
        setIngredientsData(ingredients.data);
        setLoading(true);
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
    loading && (
      <div className={`${appStyle.container} pb-10`}>
        <AppHeader />
        <IngredientsContext.Provider value={ingredientsData}>
          <selectedIngredientsContext.Provider value={constructorBurgersData}>
            <main className={appStyle.section}>
              <BurgerIngredients handleIngredientData={handleIngredientData} />
              <BurgerConstructor onClick={openOrderModal} bun="bun" />
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
          </selectedIngredientsContext.Provider>
        </IngredientsContext.Provider>
      </div>
    )
  );
}

export default App;
