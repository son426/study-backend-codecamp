import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'myGuard') {
  // useGuards(AuthGuard("myGuard")) 에서 가지고옴. user.resolver.ts
  constructor() {
    // 부모에다가 던져줘야함.
    // 인가 부분임.
    // 성공 시 validate 실행 / 실패시 에러 던짐. validate로 안내려감.
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // req.headers 에서 Authorization 뽑아냄.
      secretOrKey: 'myAccessKey', // auth.service에서 jwt 토큰 생성할때 설정해준 값.
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
