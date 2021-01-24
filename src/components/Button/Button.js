import React from "react";
import PropTypes from "prop-types";
import s from "./Button.module.css";

const Button = ({ fetchImages }) => {
  return (
    <button type="button" onClick={fetchImages} className={s.Button}>
      Load more...
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func,
};
export default Button;
