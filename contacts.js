const fs = require('fs').promises
const path = require('path');
const { getMaxListeners } = require('process');
const shortid = require('shortid');

    
const contactsPath = path.join(__dirname, './db/contacts.json');  //путь к ф. contacts.json


 const  listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response)
    return contacts  
  }
  catch (err) { console.log(err) }
  
  }

 

const getContactById = async contactId => {
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response)
    const userId = contacts.find(
      contact => contact.id === contactId)
    
    
     return  console.log(userId)
    
  }
  catch (err) {
    console.log(err)
  }
}



const removeContact = async contactId => {

  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response)
    const getContactId = contacts.find(contact => contact.id === contactId)
  
    if (!getContactId) {
    return console.log("нет контакта с таким Id")
    }

  const newContacts = contacts.filter(contact => contact.id !== contactId)
 
    
  fs.writeFile(contactsPath, JSON.stringify(newContacts, null, '\t'))
  }
  
catch(err){console.log(err)}

  }




const addContact = async( name, email, phone) => {
  try {
    const response = await fs.readFile(contactsPath)
    const contacts = JSON.parse(response)

      
   contacts.push({id: contacts.length + 1,
      name,
      email,
      phone});

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'))
  }catch(err){console.log(err)}
    
   }
 

  

module.exports = {
  listContacts,
    getContactById,
    removeContact,
    addContact
}  


