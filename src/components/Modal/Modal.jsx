import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../Modal-Overlay/Modal-Overlay";
import ModalStyle from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRootElement = document.querySelector("#react-modals");

const Modal = (props) => {
  const { children, onClose } = props;

  React.useEffect(() => {
    const handleClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keyup", handleClose);
    return () => document.removeEventListener("keyup", handleClose);
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={`${ModalStyle.container} pr-10 pl-10`}>
        <button
          onClick={onClose}
          className={`${ModalStyle.leave} pt-15 pr-10`}
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть окно"
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRootElement
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
