import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  // refresh 토큰은 super 안 부분이 다름
  // jwtFromRequest 부분이 bearer 방식으로 빼오는게 아니라, 브라우저 쿠키에서 빼옴.
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        console.log('cookie : ', cookie);
        console.log('refreshToken : ', refreshToken);
        return refreshToken;
      },
      secretOrKey: 'myRefreshKey', // auth.service에서 jwt 토큰 생성할때 설정해준 값.
    });
  }

  // payload : 복호화된 payload
  // jwt : header(헤더) + payload(내용) + signature(서명)
  validate(payload) {
    console.log(payload); // payload : email:@@, sub: ~~

    // 여기서 return 해주면
    // req.user 에 이 값들이 들어감.
    // @CurrentUser에서 이 내용 확인 가능
    // 원하는 값들 더 넣어도됨. age:13 넣으면 들어감. CurrentUser에 찍힌다는 말
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
