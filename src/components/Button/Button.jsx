import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css'

const Button = ({ onClick }) => {
  return (
    <div className={styles.ButtonContainer}>
      <button className={styles.Button} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;