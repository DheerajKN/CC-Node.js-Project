const express = require('express');
const router = express.Router();
const passwordValidator = require('password-validator');
const validator = require("email-validator");

const members = [];
// Create a schema
const schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1);                              // Must have at least 2 digits

// Filter Method based on username from body
const userNameFilter = req => member => member.username === req.body.username;
// Filter Method based on authToken from headers
const authTokenFilter = req => member => member.authToken === req.headers.authtoken;

// Gets All Members sorted by last_seen_at
router.get('/', (req, res) => {
    //Find if the token is valid or not by checking if there is such object or not
    const found = members.filter(authTokenFilter(req));
    if (found.length > 0) {
        //Find index of specific object using findIndex method.    
        objIndex = members.findIndex(authTokenFilter(req));

        //Update object's last_seen_at property.
        members[objIndex].last_seen_at = new Date();
        
        //sort objects based on last_seen_at
        let sortedMembers = members.sort((a, b) => b.last_seen_at - a.last_seen_at)
        //extract only name and last_seen_at
        sortedMembers = sortedMembers.map(({ username, last_seen_at }) => ({ username, last_seen_at }));
        return res.json(sortedMembers)
    } else {
        //Error code if authToken is invalid
      return res.status(400).json({ msg: `Token Error` });
    }
});

//Gets all the highscores for all levels for any user
router.get('/highscores/user', (req, res)=>{
    //Find if the token is valid or not by checking if there is such object or not
    const found = members.filter(authTokenFilter(req));
    if (found.length > 0) {
        //Find index of specific object using findIndex method.    
        objIndex = members.findIndex(userNameFilter(req));

        if(objIndex !== undefined) {
            //Update object's last_seen_at property.
            members[objIndex].last_seen_at = new Date();
            //If True then return the scores object of the user
            return res.json(members[objIndex].scores);
        } else {
            //Else UserName invalid
            return res.status(400).json({msg: 'UserName Invalid'});
        }
    } else {
        //Else token is invalid
      return res.status(400).json({ msg: `Token Error` });
    }
})

//Get all the highscores of a level
router.get('/highscores/level/:level', (req, res)=>{
    //Find if the token is valid or not by checking if there is such object or not
    const found = members.filter(authTokenFilter(req));
    if (found.length > 0) {
        //Update object's last_seen_at property.
        members[objIndex].last_seen_at = new Date();
        
        //Iterate through all the users and get the score element whose level == passed level
        const levelscores = []
        members.forEach(member => 
            member.scores.forEach(score => {
                if(score.level === parseInt(req.params.level)){
                    levelscores.push(score)
                }
            } 
        ))
        //Pass the final answer
        return res.json(levelscores);
    } else {
      return res.status(400).json({ msg: `Token Error` });
    }
})

// Login Single Member
router.post('/login', (req, res) => {
    //Find if the username is valid or not by checking if there is such object or not
  const found = members.filter(userNameFilter(req));
  if (found.length > 0) {
      //Checking if password is correct or not
      if(found[0].password === req.body.password){
        //Find index of specific object using findIndex method.    
        objIndex = members.findIndex(userNameFilter(req));

        //Update object's last_seen_at property.
        members[objIndex].last_seen_at = new Date();
        //Creating an authToken field of the member for future authentications
        members[objIndex].authToken = Math.random().toString(36).substring(7); 
        return res.json({authToken: members[objIndex].authToken});
      } else{
        return res.status(400).json({ msg: `Password Incorrect` });
      }
  } else {
    return res.status(400).json({ msg: `No member with this usename` });
  }
});

// Create Member
router.post('/', (req, res) => {
    //Check if Password matches the criteria
    if(!schema.validate(req.body.password)){
        return res.status(400).json({ 
            msg: "Password must have at least one upper, lower character and digits"
        })
    }
    //If Members are empty then just create one without doing the username uniqueness check
    if(members.length !== 0){
        if(!members.some(userNameFilter(req))){
            return res.status(400).json({
                msg: "UserName exists"
            })
        }
    }
    //Create JSON Object with the required fields
  const newMember = {
    ...req.body,
    scores: [],
    "last_seen_at": new Date()
  };
  members.push(newMember);
  res.json(newMember);
});

// Update Score of the user
router.put('/', (req, res) => {
    //Find if the username is valid or not by checking if there is such object or not
    const found = members.filter(authTokenFilter(req));
    if (found.length > 0) {
        //Find index of specific object using findIndex method.    
        objIndex = members.findIndex(authTokenFilter(req));

        //Update object's last_seen_at property.
        members[objIndex].last_seen_at = new Date();
        //Extract scores of the loggedIn user
        scores = members[objIndex].scores;
        //If the user is new and has no scoreboard then just add it
        if(scores.length === 0){
            scores.push({level: req.body.level, score: req.body.score});
        }
        else{
            //Search for the score object with the required level
            const score = scores.filter(score => score.level === parseInt(req.body.level))
            //If present, just overlap the highest score
            if (score.length !== 0){
                scoreIndex = scores.findIndex(score => score.level === req.body.level)
                scores[scoreIndex].level = req.body.level
                scores[scoreIndex].score = req.body.score
            }else{
                //Else just push the new level and new score to user scores array
                scores.push({level: req.body.level, score: req.body.score});
            }
        }
        //Return the user info
        return res.json(members[objIndex]);
    } else {
      return res.status(400).json({ msg: `Token Error` });
    }
});

//Update User Object with email field
router.put('/email', (req, res) => {
    //Find if the username is valid or not by checking if there is such object or not
    const found = members.filter(authTokenFilter(req));
    if (found.length > 0) {
        //Find index of specific object using findIndex method.    
        objIndex = members.findIndex(authTokenFilter(req));

        //Update object's last_seen_at property.
        members[objIndex].last_seen_at = new Date();
        //Validate the email string
        if(validator.validate(req.body.email)){
            //Add it as a new key to user object
            members[objIndex].email = req.body.email;
            return res.json(members[objIndex]);
        }else{
            return res.status(400).json({msg: "Email is not Valid"})
        }

    } else {
      return res.status(400).json({ msg: `Token Error` });
    }
});

module.exports = router;