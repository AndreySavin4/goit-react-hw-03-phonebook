import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactList/ContactsList';
import { ContactFilter } from './ContactFilter/ContactFilter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localStorageArr = localStorage.getItem('contacts');
    const contacts = JSON.parse(localStorageArr);
    if (contacts) {
      this.setState({
        contacts: contacts,
      });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = contact => {
    if (this.state.contacts.some(item => item.name === contact.name)) {
      toast.error('Already exists in our databases');
      return true;
    }
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contact] };
    });
    return false;
  };

  handleChangeFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  handleDeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(item => item.id !== id),
      };
    });
  };

  handleFilterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase().trim())
    );
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <ContactFilter
          handleChange={this.handleChangeFilter}
          value={this.state.filter}
        />
        <ContactsList
          contacts={this.handleFilterContacts()}
          deleteContact={this.handleDeleteContact}
        />
        <Toaster />
      </>
    );
  }
}
