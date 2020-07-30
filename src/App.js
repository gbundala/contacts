import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";

class App extends Component {
  state = {
    contacts: [],
    screens: "list", //screens are list & addContact
  };

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts: contacts });
    });
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id),
    }));

    ContactsAPI.remove(contact);
  };

  handleClick = () => {
    this.setState({ screens: "createContact" });
  };

  render() {
    return (
      <div>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <ListContacts
                removeContact={this.removeContact}
                contacts={this.state.contacts}
                handleClick={this.handleClick}
              />
            )}
          />
          <button onClick={() => this.handleClick()}>Add Contact</button>
        </div>
        <Route path="/create" component={CreateContact} />
      </div>
    );
  }
}

export default App;
