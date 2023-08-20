import overlayStyle from "./ModalOverlay.module.css";

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay = ({ onClose }: ModalOverlayProps) => (
  <div onClick={onClose} className={overlayStyle.overlay}></div>
);

export default ModalOverlay;
