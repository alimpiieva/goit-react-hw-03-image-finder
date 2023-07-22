import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ imageData, alt, onClick }) => {
  const handleClick = () => {
    onClick(imageData);
  };

  return (
    <li className={styles['gallery-item']}>
      <img src={imageData.webformatURL} alt={alt} onClick={handleClick} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,

  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,           
};

export default ImageGalleryItem;

