import { CSSProperties, ReactNode } from "react";
import scrollStyle from "./ScrollBar.module.css";

interface ScrollBarProps {
  children: ReactNode;
  maxHeight: CSSProperties['maxHeight'];
}

const ScrollBar = ({ children, maxHeight }: ScrollBarProps) => (
  <div className={`${scrollStyle.scroll} `} style={{ maxHeight }}>
    {children}
  </div>
);

export default ScrollBar;
