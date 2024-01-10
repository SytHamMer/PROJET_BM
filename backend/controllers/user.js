const User = require('../models/user');
const CategorySpendings = require('../models/category_spendings');
const CategoryIncomes = require('../models/category_incomes');
const categorySpendingsCtrl = require('../controllers/category_spendings');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// create user
exports.createUser = (req,res,next) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
        .then(() => res.status(201).json({ message: 'User created!'}))
        .catch(error => res.status(400).json({ error }));

};


// DELETE
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'User deleted!'}))
    .catch(error => res.status(400).json({ error }));
}



// SIGNUP
exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'User signup!' , user_id: user._id }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


// LOGIN

exports.login = (req, res, next) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({message: "User doesn't exist"});
            }
            

            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({message: "Password incorrect"});
                }
                  return res.status(200).json({
                    userId: user._id, 
                    token: jwt.sign(
                        {userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                });

                
            })
            .catch(error => res.status(500).json({ othererr: "othererrr" }));
        })
        .catch(error => res.status(500).json({ err: "lala" }));

};


// GET ALL USERS

exports.getAllUser = (req, res, next) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
}

// GET USER BY ID
exports.getUserByID = (req, res, next) => {
  const userId = req.params.id;
  const user = User.findById(userId)
  .then(user => res.status(200).json(user))
  .catch(error => res.status(400).json({ error }));

}

// DELETE ALL USERS
exports.deleteAllUsers = (req, res, next) => {
  User.deleteMany()
    .then(() => res.status(200).json({ message: 'All users deleted!' }))
    .catch(error => res.status(400).json({ error }));
};


// UPDATE PASSWORD
exports.updatePassword = (req, res, next) => {
    const { id } = req.params; // Récupérez l'ID de l'utilisateur
    const { newPassword } = req.body; // Récupérez le nouveau mot de passe
    console.log("new password : ")
    console.log(newPassword);
    // Hash du nouveau mot de passe
    bcrypt.hash(newPassword, 10)
      .then(hash => {
        // Utilisez findOneAndUpdate pour mettre à jour le mot de passe de l'utilisateur
        User.findOneAndUpdate(
          { _id: id }, // Filtrez par ID
          { password: hash }, // Nouveau mot de passe hashé
          { new: true } // Option pour renvoyer l'objet mis à jour
        )
          .then(updatedUser => {
            if (!updatedUser) {
              return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "Password updated", user: updatedUser });
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Server error" });
          });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      });
  };

// UPDATE EMAIL
exports.updateEmail = (req, res, next) => {
  console.log(req.params)
  const { id } = req.params; // Récupérez l'ID de l'utilisateur
  const { newEmail } = req.body; 

    User.findOneAndUpdate(
      { _id: id }, // Filtrez par ID
      { email: newEmail }, 
      { new: true } // Option pour renvoyer l'objet mis à jour
    )
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Email updated", user: updatedUser });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      });
};


// UPDATE USERNAME
exports.updateUsername = (req, res, next) => {

  const { id } = req.params; // Récupérez l'ID de l'utilisateur
  const { newUsername} = req.body; 
  console.log("new username : ")
  console.log(newUsername);

    User.findOneAndUpdate(
      { _id: id }, // Filtrez par ID
      { username: newUsername }, 
      { new: true } // Option pour renvoyer l'objet mis à jour
    )
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Username updated", user: updatedUser });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      });
};
  


exports.getTotalSpendingsForUser = async (req, res, next) => {
  try {
    console.log(req.params)
    const { id } = req.params;
    console.log(id)
    const { startDate, endDate } = req.body;

    // Suppose you want to get total spendings for a specific user within dates
    // You would first retrieve categories for the user
    const categories = await categorySpendingsCtrl.getByIDUser(id);

    // Then, you might want to calculate total spendings across all categories
    let totalSpendings = 0;
    for (const category of categories) {
      const result = await categorySpendingsCtrl.getTotalSpendingsBetweenDates(category._id, startDate, endDate);
      console.log(result.total_spending_between_dates)
      totalSpendings += result.total_spending_between_dates;
    }

    res.status(200).json({ totalSpendings });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};
