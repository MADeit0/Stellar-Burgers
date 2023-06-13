import cardStyle from "./ConstructorCardStyles.module.css";
import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import {
  deleteIngredient,
  moveCard,
} from "../../store/burgerConstructor/burgerConstructorSlice";
import { ItemTypes } from "../../utils/constants";
import ingredientType from "../../utils/types";

const ConstructorCard = (props) => {
  const { name, price, image, fakeId, index } = props;

  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveCard({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDrag }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { fakeId, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0 : 1;
  drag(drop(ref));

  const onDelete = () => {
    dispatch(deleteIngredient(fakeId));
  };
  return (
    <li
      className={cardStyle.list}
      style={{ opacity }}
      data-handler-id={handlerId}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
        handleClose={onDelete}
      />
    </li>
  );
};

ConstructorCard.propTypes = {
  props: ingredientType,
  fakeId: PropTypes.string.isRequired,
};

export default ConstructorCard;
