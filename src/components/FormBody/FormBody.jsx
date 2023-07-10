import formStyle from "./FormBody.module.css";

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

export default FormBody;
