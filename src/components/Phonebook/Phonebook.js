import React, { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactItem from '../ContactList/ContactItem';
import FilterContacts from '../FilterContacts/FilterContacts';
import {
    PhonebookTitle,
    PBContainer,
    ContactList
} from './Phonebook.module';
import { saveLS, getLS } from '../../helpers/LocalStorage/LocalStorage';

const isEmptyLocalStorage = () => {
    if(!getLS("contacts")){
        saveLS("contacts", []);
        return []
    };
    return getLS("contacts");
};

const Phonebook = () => {
    const [contacts, setContacts] = useState(isEmptyLocalStorage());
    const [filterContacts, setFilterContacts] = useState([]);

    const addToContacts = (contact) => {
        const contactsNew = [...contacts, contact];
        setContacts(contactsNew);
    };

    useEffect(() => {
        saveLS("contacts", contacts);
        setFilterContacts(contacts);
    }, [contacts]);

    const filteredContacts = (filterValue) => {
        const newContacts = contacts.filter(contact => (contact.name.toLowerCase()).includes(filterValue.toLowerCase()));
        setFilterContacts(newContacts);
    };

    const deleteContact = (id) => {
        const newContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(newContacts);
    };

    return (
        <PBContainer>
            <PhonebookTitle>Phonebook</PhonebookTitle>
            <ContactForm contacts={contacts} addToContacts={addToContacts}/>

            <PhonebookTitle>Contacts</PhonebookTitle>
            {!contacts.length ?
                <p>Contacts not found</p>
                :
                <>
                <FilterContacts filteredContacts={filteredContacts}/>
                <ContactList>
                    {filterContacts.map((contact) => (
                        <ContactItem key={contact.id} {...contact} deleteContact={deleteContact}/>
                    ))}
                </ContactList></>
            }
        </PBContainer>
    );
};

export default Phonebook;