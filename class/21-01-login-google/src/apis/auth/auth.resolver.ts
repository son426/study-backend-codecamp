import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any, // context에는 req,res 같은 정보들이 담겨있음.
  ) {
    // 1. 로그인(이메일 일치하는 유저 DB에서 찾기)
    const user = await this.userService.findOne({ email });

    // 2-1. 일치하는 유저 없으면? 에러 던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    // 2-2. 일치하는 유저 있지만 비밀번호 틀렸다면? 에러 던지기
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호 불일치');

    // 3. refreshToken을 만들어서, 클라이언트(쿠키)에 보내주기
    this.authService.setRefreshToken({ user, res: context.res });

    // 4. 일치하는 유저 있으면? accessToken 만들어서 브라우저 전달
    return this.authService.getAccessToken({ user });
  }

  // 토큰 재발급 api
  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: any, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
