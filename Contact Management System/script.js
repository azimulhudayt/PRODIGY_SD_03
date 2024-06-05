document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    function saveContacts() {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function renderContacts() {
        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${contact.name} - ${contact.phone} - ${contact.email}</span>
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
            `;
            contactList.appendChild(li);
        });
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const contactId = document.getElementById('contact-id').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        const newContact = { name, phone, email };

        if (contactId) {
            contacts[contactId] = newContact;
        } else {
            contacts.push(newContact);
        }

        saveContacts();
        renderContacts();
        contactForm.reset();
    });

    window.editContact = (index) => {
        const contact = contacts[index];
        document.getElementById('contact-id').value = index;
        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('email').value = contact.email;
    };

    window.deleteContact = (index) => {
        contacts.splice(index, 1);
        saveContacts();
        renderContacts();
    };

    renderContacts();
});