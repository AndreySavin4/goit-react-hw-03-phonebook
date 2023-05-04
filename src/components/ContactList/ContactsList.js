import PropTypes from 'prop-types';
import css from './ContactList.module.css';
export function ContactsList({ contacts, deleteContact }) {
  return (
    <ul className={css.Contacts}>
      {contacts.map(contact => {
        return (
          <li key={contact.id} className={css.ContactsList}>
            <p className={css.ContactsInitials}>
              {contact.name}: {contact.number}
            </p>
            <button
              className={css.ContactsButton}
              onClick={() => deleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
