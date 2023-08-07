import scrollStyle from "./ScrollBar.module.css";
import PropTypes from "prop-types";

const ScrollBar = ({ children, maxHeight }) => (
  <div className={`${scrollStyle.scroll} `} style={{ maxHeight }}>
    {children}
  </div>
);

export default ScrollBar;

ScrollBar.propTypes = {
  children: PropTypes.node.isRequired,
  maxHeight: PropTypes.string.isRequired,
};
