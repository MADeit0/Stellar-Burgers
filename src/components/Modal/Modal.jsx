import ModalStyle from "./Modal.module.css";
import PropTypes from "prop-types";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

const modalRootElement = document.querySelector("#react-modals");

const Modal = (props) => {
  const { children, onClose } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    const handleCloseKey = (e) => {
      if (e.key === "Escape") {
        dispatch(onClose());
      }
    };
    document.addEventListener("keyup", handleCloseKey);
    return () => document.removeEventListener("keyup", handleCloseKey);
  }, [dispatch, onClose]);

  const handleCloseButton = () => {
    dispatch(onClose());
  };

  return ReactDOM.createPortal(
    <>
      <div className={`${ModalStyle.container} pr-10 pl-10`}>
        <button
          onClick={handleCloseButton}
          className={`${ModalStyle.leave} pt-15 pr-10`}
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть окно"
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={handleCloseButton} />
    </>,
    modalRootElement
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
