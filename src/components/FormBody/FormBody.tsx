import formStyle from "./FormBody.module.css";

import { CSSProperties, Children, ReactNode } from "react";

interface FormBodyProps {
  children: ReactNode;
  title: string;
  onSubmit: () => void;
  colorText: CSSProperties["color"];
  message: string;
  isMessage: boolean;
}

const FormBody = ({
  children,
  title = "",
  onSubmit,
  colorText,
  message,
  isMessage,
}: FormBodyProps) => {
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
