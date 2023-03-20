import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      clientID:
        '470920337440-nq780b2kl1rsn6sgaq352menq3iuigm8.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scopes: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log('accessToken : ', accessToken);
    console.log('refreshToken : ', refreshToken);
    console.log('profile : ', profile);

    // 여기에 createUser 에 들어가는 요소들이 있어야함.
    // return {
    //   email: payload.email,
    //   id: payload.sub,
    // };
  }
}
