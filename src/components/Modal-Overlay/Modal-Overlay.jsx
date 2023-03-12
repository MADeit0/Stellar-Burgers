// import PropTypes from "prop-types";
import overlayStyle from "./Modal-Overlay.module.css";

const ModalOverlay = ({ onClick }) => (
  <div onClick={onClick} className={overlayStyle.overlay}></div>
);

ModalOverlay.propTypes = {
  // bla: PropTypes.string,
};

export default ModalOverlay;
