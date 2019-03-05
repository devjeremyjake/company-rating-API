 // adding required modules to the project
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const passport = require('passport');

const app = express();

  // require passport folder file to add validation
require('./passport/passport-local');

// mongo db connection

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rateapp');

// including the CORS middle ware

app.use(cors());

app.use((req, res, next)  => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
    
   //

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

    // session middleware
app.use(session({
    secret: 'thisisasecretkey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

  // passport middleware
app.use(passport.initialize());
app.use(passport.session());  

// requiring page route script

const user = require('./routes/userRoute');
const company = require('./routes/companyRoute');

app.use('/api', user);
app.use('/api', company);

   // setting port listening
app.listen(3000, ()=> {
    console.log('Server running on port 3000');
});
