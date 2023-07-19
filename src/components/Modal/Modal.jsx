import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      const { onClose } = this.props;
      if (onClose) {
        onClose();
      }
    }
  };

  handleClose = (event) => {
    const { onClose } = this.props;
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  handleImageClick = (event) => {
    event.stopPropagation();
  };

  render() {
    const { imageData } = this.props;

    return (
      <div className={styles['modal-overlay']} onClick={this.handleClose}>
        <div className={styles['modal-content']}>
          <img
            src={imageData.largeImageURL}
            alt=""
            onClick={this.handleImageClick}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func,
};

export default Modal;
