import mongoose from 'mongoose';
import express from 'express';
import User from 'src/models/userInfo';

mongoose.connect('mongodb://localhost:2701/signup');
var db=mongoose.connection;

var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.post('/signup', function (req, res) {
  var fullname = req.body.name;
  var dayOfBirth = req.body.dayOfBirth;
  var email = req.body.email;
  var gender = req.body.gender;
  var address = req.body.address;
  var social = req.body.social;
  var profileImage = req.body.profileImage;

  // Create a new user instance using the Mongoose model
  const newUser = new User({
    fullname: fullname,
    dayOfBirth: dayOfBirth,
    email: {
      address: email,
      isVerified: false,
    },
    gender,
    address: address,
    social: {
      facebook: social,
		  twitter: social,
	  	instagram: social,
	  	github: social,
    },
    profileImage: profileImage,
    userCredentialId: new mongoose.Types.ObjectId(),
  });

  // Save the user to the database
  newUser.save()
    .then(() => {
      console.log('User saved successfully');
      return res.redirect('signup_success.html');
    })
    .catch((error) => {
      console.error('Error saving user:', error);
    });
});

