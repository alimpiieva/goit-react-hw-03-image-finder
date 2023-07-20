import React, { Component } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Modal from '../Modal/Modal';
import fetchImages from '../Api/Api';

class App extends Component {
  state = {
    searchQuery: '',
    showModal: false,
    selectedImage: null,
    page: 1,
    images: [],
    isLoading: false,
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
      selectedImage: null,
      showModal: false,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedImage: null,
    });
  };

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchImages();
      }
    );
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });

    fetchImages(searchQuery, page)
      .then((formattedImages) => {
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
  };

  openModal = (image) => {
    this.setState({
      selectedImage: image,
      showModal: true,
    });
  };

  render() {
    const { searchQuery, showModal, selectedImage, images, isLoading } = this.state;
    const hasMoreImages = images.length > 0 && images.length % 12 === 0;
    const noImagesFound = !isLoading && images.length === 0 && searchQuery !== '';

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery
          images={images}
          isLoading={isLoading}
          onImageClick={this.openModal}
          hasMoreImages={hasMoreImages}
          noImagesFound={noImagesFound}
          onLoadMore={this.handleLoadMore}
        />
        {showModal && <Modal imageData={selectedImage} onClose={this.closeModal} />}
      </div>
    );
  }
}

export default App;
