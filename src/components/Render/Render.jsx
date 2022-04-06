import React, { Component } from 'react';
import  ContactForm from '../ContactForm';
import  ContactsList from '../ContactList';
import Filter from '../Filter';
import s from './Render.module.css';


class Render extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

componentDidMount() {

    const contacts = localStorage.getItem('contacts');
    const parsedId = JSON.parse(contacts);

    if (parsedId) {
      this.setState({ contacts: parsedId });
    }
  }

   componentDidUpdate(prevProps, prevState) {

    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };
  addContact = newContact => {
    this.state.contacts.find(contact => contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase())
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, newContact],
          };
        });
  };
  onChangeFilter = filter => {
    this.setState({ filter });
  };

  removeContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const contacts = this.state.contacts;
    const filter = this.state.filter;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter),
    );
    return (
      <div className={s.render}>
        <div>
          <h1 className={s.titleFhonebook}>Phonebook</h1>
          <ContactForm onAddContact={this.addContact}></ContactForm>
        </div>
        <div>
          <h2 className={s.titleContacts}>Contacts</h2>
          {contacts.length > 1 ? (
            <Filter value={filter} onChangeFilter={this.onChangeFilter} />
          ) : null}
          <ContactsList
            contacts={filteredContacts}
            onRemoveContact={this.removeContact}>
          </ContactsList>
        </div>
        </div>
    );
  }
}

export default Render;