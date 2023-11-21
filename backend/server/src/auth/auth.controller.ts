import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 회원 가입을 하는 API
   * @param authCrentialsDto 회원 가입을 위한 요청 데이터
   */
  @Post('/signup')
  signUp(@Body() authCrentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCrentialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.singIn(authCredentialsDto);
  }
}
