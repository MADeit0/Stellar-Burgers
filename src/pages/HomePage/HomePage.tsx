import HomeStyle from "./HomePage.module.css";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import Modal from "../../components/Modal/Modal";
import { isOpenedOrderModal } from "../../store/modal/modalSlice";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";

function HomePage() {
  const dispatch = useAppDispatch();
  const orderModal = useAppSelector(({ modal }) => modal.orderModal);

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
