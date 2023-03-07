import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }
}
