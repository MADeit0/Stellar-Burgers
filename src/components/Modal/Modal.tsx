import ModalStyle from "./Modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const modalRootElement = document.querySelector(
  "#react-modals"
) as HTMLDivElement;

const Modal = (props: ModalProps) => {
  const { children, onClose } = props;

  useEffect(() => {
    /**
     *Обработчик закрытия модального окна при нажатии на клавишу 'Escape'
     *
     * @param {KeyboardEvent} e событие клавиатуры
     */
    const handleCloseKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keyup", handleCloseKey);
    return () => document.removeEventListener("keyup", handleCloseKey);
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
      <ModalOverlay onClose={onClose} />
    </>,
    modalRootElement
  );
};

export default Modal;
