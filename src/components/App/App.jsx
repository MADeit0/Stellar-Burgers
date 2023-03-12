import React from "react";
import AppHeader from "../App-Header/App-Header.jsx";
import BurgerIngredients from "../Burger-Ingredients/Burger-Ingredients.jsx";
import BurgerConstructor from "../Burger-Constructor/Burger-Constructor.jsx";
import appStyle from "./App.module.css";
import Api from "../../utils/Api.js";
import OrderDetails from "../Order-Details/Order-Details.jsx";
import { baseUrl } from "../../utils/constants.js";

import Modal from "../Modal/Modal.jsx";

const api = new Api(baseUrl);

function App() {
  const [ingredientsData, setIngredientsData] = React.useState([]);
  const [showOpenOrderDetails, setShowOpenOrderDetails] = React.useState(true);
  // const [showOpenIngredientDetails, setShowOpenIngredientDetails] =
  //   React.useState(false);

  React.useEffect(() => {
    api
      .getIngredients()
      .then((ingredients) => {
        setIngredientsData(ingredients.data);
      })
      .catch((err) => api.isRejected(err));
  }, []);

  return (
    <div className={`${appStyle.container} pb-10`}>
      <AppHeader />
      <main className={appStyle.section}>
        <BurgerIngredients ingredientslist={ingredientsData} />
        <BurgerConstructor ingredientslist={ingredientsData} menu="bun" />
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
    </div>
  );
}

export default App;
