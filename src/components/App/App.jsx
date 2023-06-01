import appStyle from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader.jsx";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.jsx";
import OrderDetails from "../OrderDetails/OrderDetails.jsx";
import IngredientDetails from "../IngredientDetails/IngredientDetails.jsx";
import Modal from "../Modal/Modal.jsx";

import {
  closeIngredientDetailsModal,
  closeOrderModal,
} from "../../store/modal/modalSlice";

import { useSelector } from "react-redux";

function App() {
  const { ingredientDetailsModal } = useSelector(({ modal }) => modal);
  const { orderModal } = useSelector(({ modal }) => modal);

  return (
    <div className={`${appStyle.container} pb-10`}>
      <AppHeader />

      <main className={appStyle.section}>
        <BurgerIngredients />
        <BurgerConstructor bun="bun" />
      </main>
      {orderModal && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
      {ingredientDetailsModal && (
        <Modal onClose={closeIngredientDetailsModal}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
