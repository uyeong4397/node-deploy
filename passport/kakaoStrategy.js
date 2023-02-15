/*
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile._json?.kakao_account?.email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
*/


const KaKaoStrategy = require('passport-kakao').Strategy;
//const passport = require('passport');
//const passport = require('passport');
const {User} = require('../models/users');

module.exports = (passport) =>{
    passport.use(new KaKaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL:'/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) =>{
        //console.log('kakao profile', profile);
        try{
            const exUser = await User?.find({
                where: {snsId: profile.id, provider: "kakao"}});
                //console.log(exUser);
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User?.create({
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch(error){
            console.error(error);
            done(error);
        }
    }));
};
