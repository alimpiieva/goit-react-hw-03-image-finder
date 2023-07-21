import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onImageClick: PropTypes.func.isRequired,
  };

  handleImageClick = (image) => {
    const { onImageClick } = this.props;
    onImageClick(image);
  };

  render() {
    const { images } = this.props;

    return (
      <div>
        <ul className={styles.gallery}>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              imageData={image}
              alt={image.tags}
              onClick={this.handleImageClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ImageGallery;
