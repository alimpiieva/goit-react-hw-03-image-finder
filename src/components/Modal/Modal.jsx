import { Component } from 'react';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    this.openLightbox();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imageData !== this.props.imageData) {
      this.closeLightbox();
      this.openLightbox();
    }
  }

  componentWillUnmount() {
    this.closeLightbox();
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  openLightbox() {
    const { imageData } = this.props;
    if (imageData) {
      this.instance = basicLightbox.create(`
        <img src="${imageData.largeImageURL}" alt="" />
      `);
      this.instance.show();
    }
  }

  closeLightbox() {
    if (this.instance) {
      this.instance.close();
      this.instance = null;
    }
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      const { onClose } = this.props;
      if (onClose) {
        onClose();
      }
    }
  };

  render() {
    return null;
  }
}

Modal.propTypes = {
  imageData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func,
};

export default Modal;
