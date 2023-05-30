import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, OnModuleInit } from '@nestjs/common';
import { LoginInput, SignupInput } from './dto/create-auth.dto';
import AuthInterface from './interface/auth.interface';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private gRpcService: AuthInterface;
  constructor(
    @Inject('AUTH_SERVICE')
    private client: ClientGrpc
  ) {}

  onModuleInit() : any {
    this.gRpcService = this.client.getService<AuthInterface>('AuthService');
  }

  @Post('signup')
  async signUp(@Body() signupInput: SignupInput) {
    return this.gRpcService.signUp(signupInput);
  }

  @Post('login')
  async signIn(@Body() loginInput: LoginInput) {
    const result = await this.gRpcService.signIn(loginInput);
    return result;
  }

  @Get('profiles')
  async getAllProfiles() {
    return this.gRpcService.getAllProfiles({});
  }
}
