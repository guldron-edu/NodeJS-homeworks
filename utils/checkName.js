const checkName = (contactsList, name) => {
  return (newUser = contactsList.filter((contact) => contact.name === name));
};

module.exports = checkName;
