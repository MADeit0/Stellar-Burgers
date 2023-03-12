import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyle from "./Modal.module.css";
// import PropTypes from 'prop-types';
const modalRootElement = document.querySelector("#react-modals");

const Modal = (props) => {
  const { children, closeHandler } = props;

  React.useEffect(() => {
    const handleClose = (evt) => {
      if (evt.key === "Escape") {
        closeHandler(false);
      }
    };
    document.addEventListener("keyup", handleClose);
  });

  return ReactDOM.createPortal(
    <div onClick={() => closeHandler(false)} className={ModalStyle.overlay}>
      <div className={`${ModalStyle.container}`}>
        <button
          onClick={() => closeHandler(false)}
          className={`${ModalStyle.leave} pt-15 pr-10`}
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть окно"
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>,
    modalRootElement
  );
};

Modal.propTypes = {
  // bla: PropTypes.string,
};

Modal.defaultProps = {
  // bla: 'test',
};

export default Modal;
