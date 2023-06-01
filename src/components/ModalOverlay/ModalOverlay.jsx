import PropTypes from "prop-types";
import overlayStyle from "./ModalOverlay.module.css";

const ModalOverlay = ({ onClose }) => (
  <div onClick={onClose} className={overlayStyle.overlay}></div>
);

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
