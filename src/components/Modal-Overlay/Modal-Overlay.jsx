import PropTypes from "prop-types";
import overlayStyle from "./Modal-Overlay.module.css";

const ModalOverlay = ({ onClick }) => (
  <div onClick={onClick} className={overlayStyle.overlay}></div>
);

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
