

module.exports = {

  db: process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

  instagram: {
    clientID: process.env.INSTAGRAM_ID || 'c61f6cd633df476ca26ec473a9824093',
    clientSecret: process.env.INSTAGRAM_SECRET || '6bb3dea95a914764bcd7a1c75f2c1d01',
    callbackURL: '/auth/instagram/callback',
    passReqToCallback: true
  },

};
