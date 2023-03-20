import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ExtractJwt } from 'passport-jwt';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '470920337440-nq780b2kl1rsn6sgaq352menq3iuigm8.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(profile);

    return {
      email: profile.emails[0].value,
      password: '0000',
      name: profile.displayName,
      age: 0,
    };
  }
}
