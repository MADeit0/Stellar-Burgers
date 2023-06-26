import formStyle from "./FormBody.module.css";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Children } from "react";

const FormBody = ({ children, title, btn }) => {
  return (
    <form className={formStyle.form}>
      <h1 className={`${formStyle.title} text text_type_main-medium`}>
        {title}
      </h1>
      <ul className={formStyle.lists}>
        {Children.map(children, (child) => (
          <li> {child} </li>
        ))}
      </ul>
      <Button htmlType="button" type="primary" size="large" extraClass="mb-20">
        {btn}
      </Button>
    </form>
  );
};

export default FormBody;
