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
import api from "../../utils/Api.js";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [ingredientsData, setIngredientsData] = React.useState([]);
  const [constructorBurgersData, setConstructorBurgersData] = React.useState(
    []
  );
  const [orderNumber, setOrderNumber] = React.useState(0);

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

  const handleOrder = () => {
    const ingredientsId = constructorBurgersData.map(
      (ingredientsI) => ingredientsI._id
    );

    api
      .sendIngredients(ingredientsId)
      .then((ingredients) => {
        setOrderNumber(ingredients.order.number);
      })
      .catch((err) => api.handleError(err));
  };

  const openOrderModal = () => {
    setShowOpenOrderDetails(true);
    handleOrder();
  };

  const closeOrderModal = () => {
    setShowOpenOrderDetails(false);
    setConstructorBurgersData([]);
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
          <selectedIngredientsContext.Provider
            value={[constructorBurgersData, setConstructorBurgersData]}
          >
            <main className={appStyle.section}>
              <BurgerIngredients handleIngredientData={handleIngredientData} />
              <BurgerConstructor onClick={openOrderModal} bun="bun" />
            </main>
            {showOpenOrderDetails && (
              <Modal onClose={closeOrderModal}>
                <OrderDetails orderNumber={orderNumber} />
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
