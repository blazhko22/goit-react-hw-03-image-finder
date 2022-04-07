import React from 'react';
import s from './Searchbar.module.css';

class Searchbar extends React.Component {
  state = { name: "" };
  onChengeValue = (e) => {
    const { value } = e.currentTarget;
    this.setState({ name: value });
  };
  handleSubmit = (evt) => {
    const { name } = this.state;
    evt.preventDefault();
    this.props.onSubmit(name);
  };

  render() {
    const { name } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            onChange={this.onChengeValue}
            value={name}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;