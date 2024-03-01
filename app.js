// var fs = require('fs');
// // Performing a blocking I/O
// var file = fs.readFileSync('C:/Users/admin/Desktop/data.txt');
// console.log(file);
// // Performing a non-blocking I/O
// fs.readFile('C:/Users/admin/Desktop/data.txt', function(err, file) {
//     if (err) return err;
//     console.log(file);
// });


require("dotenv").config()
const express = require('express')
const app = express()
const Sequelize = require('sequelize');


app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

// Define the User model
const User = sequelize.define('fast', {
  email: Sequelize.STRING,
  // other columns...
}, {
  // Define indexes
  indexes: [
    {
      unique: true,
      fields: ['email'],
      name: 'idx_users_email' // Optional, name your index
    }
  ],
});

// Synchronize the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database and tables created!');
  })
  .catch(err => {
    console.error('Error creating database and tables:', err);
  });


  app.post('/api/users', async (req, res) => {
    try {
      const { email } = req.body;
      const newUser = await User.create({ email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// app.get("/api/retreive_data",async (req,res)=>{
//     User.getCollection("user").createIndex({ "email": 1 }, { "name": "email_1", "unique": true })
//   {
//    "createdCollectionAutomatically" : false,
//    "numIndexesBefore" : 1,
//    "numIndexesAfter" : 2,
//    "ok" : 1
//   }
// })

// Initialize Sequelize with database connection information
// const sequelize = new Sequelize('postgres', 'postgres', 'zealzoft@123', {
//   host: 'localhost',
//   dialect: 'postgres'
// });
  

app.listen(3000,()=>`server is running 3000`)