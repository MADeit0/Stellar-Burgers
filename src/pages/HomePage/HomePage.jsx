import HomeStyle from "./HomePage.module.css";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor.jsx";
import OrderDetails from "../../components/OrderDetails/OrderDetails.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import { isOpenedOrderModal } from "../../store/modal/modalSlice";

import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function HomePage() {
  const dispatch = useDispatch();
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
        <Modal
          onClose={() => {
            dispatch(isOpenedOrderModal(false));
          }}
        >
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default HomePage;
