import React from "react";
// import PropTypes from 'prop-types';
import Ingredient from "../Ingridient/Ingredient.jsx";

const IngredientsBoard = ({ data, title, menu }) => (
  <section>
    <h2>{title}</h2>
    <ul>
      {data.map(
        (item) => item.type === menu && <Ingredient {...item} key={item._id} />
      )}
    </ul>
  </section>
);

IngredientsBoard.propTypes = {
  // bla: PropTypes.string,
};

IngredientsBoard.defaultProps = {
  // bla: 'test',
};

export default IngredientsBoard;
