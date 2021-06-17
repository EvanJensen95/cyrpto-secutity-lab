const bcrypt = require('bcryptjs');
const users = []
 
module.exports = {
 login: (req, res) => {
   const { username, password } = req.body
  
   for (let i = 0; i < users.length; i++) {
     if (users[i].username === username) {
       const good = bcrypt.compareSync(password, users[i].passwordHash)
       if (good) {
         let userToReturn = {...users[i]}
         delete userToReturn.passwordHash
         res.status(200).send(userToReturn)
       }
     }
   }
   res.status(400).send("User not found.")
 },
   register: (req, res) => {
       console.log('Registering User')
       console.log(req.body)
       const { username, email, firstName, lastName, password } = req.body  // properties that the user enters on the front end, converted to a variable.
       const salt = bcrypt.genSaltSync(5);
       const passwordHash = bcrypt.hashSync(password, salt);
       let user = {
         username,
         email,
         firstName,
         lastName,
         passwordHash
       }
 
 
       users.push(user) // adding the user info above to the users array
       console.log(users)
       let usersToReturn = {...user};
       delete usersToReturn.passwordHash
       res.status(200).send(usersToReturn)
   }
}
