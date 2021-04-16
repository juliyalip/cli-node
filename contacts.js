const fs = require('fs');
const path = require('path');
const { getMaxListeners } = require('process');
const shortid = require('shortid');

    
const contactsPath = path.join(__dirname, './db/contacts.json');  //путь к ф. contacts.json


  function listContacts() {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
     if (err) {
       console.log(err)
       return
      }console.table(data)
    })
   
}
 

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    const contacts = JSON.parse(data)
    const contact = contacts.find(contact => contact.id === contactId)
    console.log(contact)
  })
}


function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    const contacts = JSON.parse(data).filter(contact => contact.id !== contactId)
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) =>{ if(err) {console.log(err)}})
  })
}

   
function addContact(name, email, phone) {
  const user = {
    id: shortid.generate(),
    name,
    email,
    phone
  }
    fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
      const contacts = JSON.parse(data)
      contacts.push(user)
       fs.writeFile(contactsPath, JSON.stringify(contacts), err => {
        if(err){console.log(err)}
      } )

  })

 
  } 

module.exports = {
  listContacts,
    getContactById,
    removeContact,
    addContact
}  


