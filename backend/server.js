const express = require('express');
const mongoose = require('mongoose');

const url = 'mongodb://mlebon:info734@193.48.125.44/?authMechanism=DEFAULT&authSource=admin';
const dbName = "Les<3bestiiiies"

const app = express();
const PORT = 3000;




// create schemas

const user_table = new mongoose.Schema({
  mail:String,
  username:String,
  password:String
});

const user  = mongoose.model("User",user_table);


const category_table = new mongoose.Schema({
  name:String,
  mounthly_limite:Number,
});

const category = mongoose.model("Category",category_table);

const spending_table = new mongoose.Schema({
  value:Number,
  date:{ type: Date, default: Date.now },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const spending = new mongoose.model("Spending", spending_table);

// Connexion to MongoDB
mongoose.connect(`${url}.${dbName}`)




//delete table

app.get('/delete_collection', async (req, res) => {
  try {
    await user.deleteMany({}); // Supprime tous les documents de la collection "User"
    res.send('Contenu de la collection vidé avec succès !');
  } catch (error) {
    console.error('Erreur lors de la suppression du contenu de la collection :', error);
    res.status(500).send('Erreur lors de la suppression du contenu de la collection');
  }
});
//create tables

app.get("/create_table",async(req,res)=>{
  try{
    await user.createCollection();
    res.write('Collection "user" créée avec succès !');
    const new_user = new user({
      mail:"kéké@gmail.com",
      username:"kéké",
      password:"kkékémdp"
    })
    const keke = await new_user.save();
    console.log("kéké est créé ?", keke);
    await category.createCollection();
    res.write('Collection "category" créée avec succès !');
    await spending.createCollection();
    res.end('Collection "speending" créée avec succès !');


  } catch(err){
    console.error('Erreur lors de la création de la collection :', err);
    res.status(500).send('Erreur lors de la création de la collection');
  }
});

//listening the serv

app.listen(PORT,()=> {
  console.log('Server Node.js currently executing on port ' + PORT);});