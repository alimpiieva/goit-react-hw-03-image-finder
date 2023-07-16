import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css'

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    if (query.trim() === '') {
      return;
    }
    const { onSubmit } = this.props;
    onSubmit(query);
    this.setState({
      query: '',
    });
  };

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  render() {
    const { query } = this.state;
    
      return (
        <header className={styles.SearchForm}>
        <div className={styles['SearchbarContainer']}>
          <form className={styles['SearchFormForm']} onSubmit={this.handleSubmit}>
            <button type="submit" className={styles['SearchFormButton']}>
              <span>🔍</span>
            </button>
            <input
              className={styles['SearchFormInput']}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={query}
              onChange={this.handleChange}
            />
            </form>
            </div>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Searchbar;
