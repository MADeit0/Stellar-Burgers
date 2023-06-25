import HomeStyle from "./HomePage.module.css";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor.jsx";
import OrderDetails from "../../components/OrderDetails/OrderDetails.jsx";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import {
  closeIngredientDetailsModal,
  closeOrderModal,
} from "../../store/modal/modalSlice";

import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function HomePage() {
  const ingredientDetailsModal = useSelector(
    ({ modal }) => modal.ingredientDetailsModal
  );
  const orderModal = useSelector(({ modal }) => modal.orderModal);

  return (
    <>
      <div className={HomeStyle.section}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
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
    </>
  );
}

export default HomePage;
