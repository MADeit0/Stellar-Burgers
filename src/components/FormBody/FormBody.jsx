import formStyle from "./FormBody.module.css";
import PropTypes from "prop-types";

import { Children } from "react";

const FormBody = ({
  children,
  title,
  onSubmit,
  colorText,
  message,
  isMessage,
}) => {
  return (
    <form onSubmit={onSubmit} className={formStyle.form}>
      <h1 className={`${formStyle.title} text text_type_main-medium`}>
        {title}
      </h1>
      <ul className={formStyle.lists}>
        {Children.map(children, (child) => (
          <li> {child} </li>
        ))}
      </ul>

      <p className="text text_type_main-default" style={{ color: colorText }}>
        {isMessage && message}
      </p>
    </form>
  );
};

FormBody.defaultProps = {
  title: "",
};

FormBody.propTypes = {
  children: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  colorText: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isMessage: PropTypes.bool.isRequired,
};

export default FormBody;
