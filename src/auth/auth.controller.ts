import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { SigninDto } from './dtos/signin.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userData: SignupDto) {
    return await this.authService.signup(userData);
  }

  @Post('signin')
  async signin(@Body() userData: SigninDto) {
    return await this.authService.signin(userData);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenObj: RefreshTokenDto) {
    const { refresh_token } = refreshTokenObj;
    return await this.authService.refreshToken(refresh_token);
  }

  @Post('revoke-refresh-token')
  async revokeRefreshToken(@Body() refreshTokenObj: RefreshTokenDto) {
    const { refresh_token } = refreshTokenObj;
    return await this.authService.revokeRefreshToken(refresh_token);
  }
}
