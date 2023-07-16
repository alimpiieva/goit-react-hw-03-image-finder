import React, { Component } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      showModal: false,
      selectedImage: null,
    };
  }

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedImage: null,
      showModal: false,
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

  render() {
    const { searchQuery, showModal, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery
          searchQuery={searchQuery}
          onImageClick={this.openModal}
          selectedImage={selectedImage}
        />
        {showModal && <Modal imageData={selectedImage} onClose={this.closeModal} />}
      </div>
    );
  }
}

App.propTypes = {
  searchQuery: PropTypes.string,
  showModal: PropTypes.bool,
  selectedImage: PropTypes.object,
};

export default App;
