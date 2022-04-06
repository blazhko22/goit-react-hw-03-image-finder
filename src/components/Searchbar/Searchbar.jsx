import React from 'react';
import { nanoid } from 'nanoid';
import s from './Searchbar.module.css';

class Searchbar extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmitForm = event => {
    event.preventDefault();
    const contact = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };
    this.props.onAddContact(contact);
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <>
        <form className={s.form} onSubmit={this.handleSubmitForm}>
          <label>
            Name
            <input className={s.input}
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
            Number
            <input className={s.input}
              name="number"
              type="text"
              value={this.state.number}
              onChange={this.handleChange}
              required
            />
          </label>
          <button type="submit" className={s.button}>Add contact</button>
        </form>
      </>
    );
  }
}

export default Searchbar;