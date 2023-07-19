import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import LoaderComponent from '../Loader/Loader.jsx';
import Modal from '../Modal/Modal';
import styles from './ImageGallery.module.css';

class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    isLoading: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      const { searchQuery } = this.props;
      this.fetchImages(searchQuery);
    }
  }

  fetchImages = (searchQuery) => {
    this.setState({ isLoading: true });

    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=1&key=37005405-aee23f10e1a9d709a8c5923f1&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedImages = data.hits.map((image) => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        }));
        this.setState({ images: formattedImages });
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleImageClick = (image) => {
    this.setState({ selectedImage: image });
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null });
  };

  handleLoadMore = () => {
    const { searchQuery } = this.props;
    const { images } = this.state;
    const currentPage = Math.ceil(images.length / 12) + 1;

    this.setState({ isLoading: true }, () => {
      fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=37005405-aee23f10e1a9d709a8c5923f1&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((response) => response.json())
        .then((data) => {
          const formattedImages = data.hits.map((image) => ({
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
          }));
          this.setState((prevState) => ({
            images: [...prevState.images, ...formattedImages],
          }));
        })
        .catch((error) => {
          console.error('Error fetching images:', error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    });
  };

  render() {
    const { images, isLoading, selectedImage } = this.state;
    const { searchQuery } = this.props;
    const hasMoreImages = images.length > 0 && images.length % 12 === 0;

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
        {searchQuery && !isLoading && images.length === 0 && <p>No images found.</p>}
        {hasMoreImages && !isLoading && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}
        {selectedImage && (
          <Modal imageData={selectedImage} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}

export default ImageGallery;
