import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>

        ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'auth',
            protoPath: join(process.cwd(), 'src/auth/auth.proto'),
            url: configService.get('SERVER_HOST')
          }
        })
    },
  ],
})
export class AuthModule { }
