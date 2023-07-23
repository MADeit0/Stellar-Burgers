import scrollStyle from "./ScrollBar.module.css";
import PropTypes from "prop-types";

const ScrollBar = ({ children }) => (
  <div className={`${scrollStyle.scroll} mt-10`}>{children}</div>
);

export default ScrollBar;

// ScrollBar.propTypes = {
//   children: PropTypes.array.isRequired,
// };
