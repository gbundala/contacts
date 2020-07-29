import React, { Component } from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    removeContact: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    // console.log(query);
  };

  clearQuery = () => {
      this.setState({ query: '',})
  }

  render() {
    const { contacts, removeContact } = this.props;
    const { query } = this.state;

    let showingContacts;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i"); //STUDYME
      showingContacts = contacts.filter((contact) =>
        match.test(contact.name)
      );
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy("name"));

    return (
      <div className="list-contacts">
        {/* {JSON.stringify(this.state)} */}

        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)} //the event is just an object that js gives us from the onChange prop
          />
        </div>

        {showingContacts.length !== contacts.length && (
            <div className='showing-contacts'>
                <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                <button onClick={() => this.clearQuery()}>
                    Show all
                </button>
            </div>
        )}

        <div className="contact-list">
          {showingContacts.map((contact) => (
            <div className="contact-list-item" key={contact.id}>
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`,
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => removeContact(contact)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ListContacts;
