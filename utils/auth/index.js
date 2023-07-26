const passport = require('passport');

const LocalStategy = require('./strategies/local.strategies');
const JwtStrateg = require('./strategies/jwt.strategies')

passport.use(LocalStategy);
passport.use(JwtStrateg);