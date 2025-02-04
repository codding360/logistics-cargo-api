import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '~/modules/auth/auth.service';
import { RegisterDto } from '~/modules/auth/dto/register.dto';
import { LoginDto } from '~/modules/auth/dto/login.dto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '@prisma/client';
import { AuthGuard } from '~/shared/guards/auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() reply: FastifyReply) {
    const user: User = await this.authService.validateUser(registerDto.email);
    if (user) throw new BadRequestException('User already exists');
    const createdUser = await this.authService.createUser(registerDto);
    return reply.status(201).send({
      message: 'User registered successfully.',
      data: createdUser,
    });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    return reply.status(200).send({ data: { user: req.user } });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() reply: FastifyReply) {
    const { email, password } = loginDto;
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const token = await this.authService.createJWT(user);
    return reply.status(200).send({
      message: 'Authenticated successfully.',
      data: {
        user: user,
        accessToken: token,
      },
    });
  }
}
