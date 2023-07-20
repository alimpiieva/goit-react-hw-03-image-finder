import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import LoaderComponent from '../Loader/Loader.jsx';
import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onImageClick: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    hasMoreImages: PropTypes.bool.isRequired,
    noImagesFound: PropTypes.bool.isRequired,
  };

  handleImageClick = (image) => {
    const { onImageClick } = this.props;
    onImageClick(image);
  };

  render() {
    const { images, isLoading, hasMoreImages, noImagesFound, onLoadMore } = this.props;

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
        {isLoading && <LoaderComponent />}
        {noImagesFound && <p>No images found.</p>}
        {hasMoreImages && !isLoading && (
          <Button onClick={onLoadMore}>Load More</Button>
        )}
      </div>
    );
  }
}

export default ImageGallery;
