import { Module } from '@nestjs/common';
import { UsersModule } from '~/modules/users/users.module';
import { AuthModule } from '~/modules/auth/auth.module';
import { DatabaseModule } from '~/shared/database/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AppModule {}
