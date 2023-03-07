import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

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
  ) {
    // 1. 로그인(이메일 일치하는 유저 DB에서 찾기)
    const user = await this.userService.findOne({ email });

    // 2-1. 일치하는 유저 없으면? 에러 던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    // 2-2. 일치하는 유저 있지만 비밀번호 틀렸다면? 에러 던지기
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호 불일치');

    // 3. 일치하는 유저 있으면? accessToken 만들어서 브라우저 전달
    return this.authService.getAccessToken({ user });
  }
}
