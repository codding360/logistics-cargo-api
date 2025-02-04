import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '~/modules/users/users.service';
import { RegisterDto } from '~/modules/auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(registerDto: RegisterDto) {
    const hashedPassword = await this.hashPassword(registerDto.password);
    return await this.userService.createUser({
      firstname: registerDto.firstname,
      lastname: registerDto.lastname,
      email: registerDto.email,
      password_hash: hashedPassword,
      phone_number: String(registerDto.phone_number),
    });
  }

  async validateUser(email: string, password = ''): Promise<User | null> {
    const user = await this.userService.user({ email: email });
    if (!password && password === '') return user;
    if (
      user &&
      password !== '' &&
      (await this.comparePassword(password, user.password_hash))
    ) {
      return user;
    }
    return null;
  }

  async createJWT(user: User): Promise<string> {
    return await this.jwtService.signAsync(user, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });
  }

  async verifyToken(token: string): Promise<User> {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  async comparePassword(
    password: string,
    passwordConfirm: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, passwordConfirm);
    } catch (e) {
      this.logger.error('Error comparing password', e);
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (e) {
      this.logger.error('Error hashing password', e);
    }
  }
}
