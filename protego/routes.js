var UserController = require('./controllers/userController');
var User = require('./models/userModel')
var spotcrime =require('spotcrime')
module.exports = (app) => {

  // middleware function!
  var checkIfLoggedIn = function (req, res, next) {
    if (req.session.uid) {
        console.info('User is logged in, proceeding to dashboard...'.green);
        next();
    } else {
        console.warn('User is not logged in!'.yellow)
        res.redirect('/auth.html');
    }
  }


  app.post('/register', UserController.registerUser);   // register form submission


  app.post('/login', UserController.loginUser);         // login form submission

  app.get('/me', function(req, res){
//     res.send(req.session);
    User.findOne({_id : req.session.uid}, function(err, user){
      res.send(user)
    })

  });

  // This route should only be available if someone is logged in
  app.get('/dashboard', checkIfLoggedIn, function (req, res) {
      res.send('the home page')
  });


  app.get('/logout', function (req, res) {
      req.session.reset(); // clears the users cookie session
      res.redirect('/auth.html');
  });

  app.post('/api/users/:id', (req,res) =>{

    User.update({_id: req.params.id}, req.body, (err, up) =>{
      res.send(up)
    })
  })


  // crime data
  app.get('/crimestuff', (req, res)=>{
    res.query

    var loc = {
      lat: req.query.lat,
      lon: req.query.lon
    };

    var radius = 20; // this is miles

    spotcrime.getCrimes(loc, radius, function(err, crimes){
      console.log("crimes", err, crimes);
      res.send(crimes);

    });

  })

}
