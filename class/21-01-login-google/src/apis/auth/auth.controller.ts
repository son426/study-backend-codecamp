import { Controller, Get } from '@nestjs/common';
import { Req, Res, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request, //
    @Res() res: Response,
  ) {
    //   // // 1. 가입확인
    //   // let user = this.userService.findOne({ email:?? });
    //   // // 2. 회원가입
    //   // if(!user){
    //   //     user = await this.userService.create({
    //   //         email:,
    //   //         hashedPassword,
    //   //         name,
    //   //         age,
    //   //     })
    //   // }
    //   // // 3. 로그인
    //   // this.authService.setRefreshToken({user, res})
    //   // res.redirect("http://localhost:5500/class/21-01-login-google/front/social-login.html")
    //   // console.log('구글로그인 완료');
  }
}
