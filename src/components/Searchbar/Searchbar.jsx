import { useState } from 'react';
import Search from './Search.module.css';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery === '') {
      return;
    }
    onSubmit(searchQuery);
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={Search.form}>
        <button type="submit" className={Search.formBtn}>
          <span>Search</span>
        </button>

        <input
          type="text"
          value={searchQuery}
          onChange={handleNameChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
