import React, { Component } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Modal from '../Modal/Modal';
import fetchImages from '../Api/Api';
import LoaderComponent from 'components/Loader/Loader';
import Button from 'components/Button/Button';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    isLoading: false,
    noImagesFound: false,
    hasMoreImages: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page || this.state.searchQuery !== prevState.searchQuery) {
      this.fetchImages();
    }
  }

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedImage: null,
    });
  };

  handleClose = (event) => {
    const { onClose } = this.props;
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
    );
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });

    fetchImages(searchQuery, page)
      .then((formattedImages) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...formattedImages],
          isLoading: false,
          noImagesFound: formattedImages.length === 0,
          hasMoreImages: formattedImages.length === 12,
        }));
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        this.setState({ isLoading: false });
      });
  };

  openModal = (image) => {
    this.setState({
      selectedImage: image,
      showModal: true,
    });
  };

  render() {
    const { showModal, selectedImage, images, isLoading, noImagesFound, hasMoreImages } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {showModal && <Modal imageData={selectedImage} onClose={this.closeModal} />}

        {isLoading && <LoaderComponent />}
        {noImagesFound && <p>No images found.</p>}
        {hasMoreImages && !isLoading && <Button onClick={this.handleLoadMore}>Load More</Button>}
      </div>
    );
  }
}

export default App;
