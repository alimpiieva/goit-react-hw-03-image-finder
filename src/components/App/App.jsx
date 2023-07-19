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
    };


  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      selectedImage: null,
      showModal: false,
    }, () => {
      this.fetchImages();
    });
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

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1
    }), () => {
      this.fetchImages();
    });
  };


  render() {
    const { searchQuery, showModal, selectedImage, images, isLoading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery
          searchQuery={searchQuery}
          onImageClick={this.openModal}
          selectedImage={selectedImage}
          images={images}
          isLoading={isLoading}
          onLoadMore={this.handleLoadMore}
        />
        {showModal && <Modal imageData={selectedImage} onClose={this.closeModal} />}
      </div>
    );
  }
}

export default App;


