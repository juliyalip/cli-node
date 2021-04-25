const fs = require('fs').promises
const path = require('path');
const { v4: uuidv4 } = require('uuid');



    
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

    const contacts = await listContacts()

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
   
    const contacts = await listContacts()
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
   
    const contacts = await listContacts()

      
   contacts.push({id: uuidv4(),
      name,
      email,
      phone});

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'))
  }catch(err){console.log(err)}
    
   }
 

 addContact('kiwi', 'kiwi@mail.net', '523-65-74') 

module.exports = {
  listContacts,
    getContactById,
    removeContact,
    addContact
}  


