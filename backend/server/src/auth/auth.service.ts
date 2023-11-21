import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getHashedPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const hashedPassword = await this.getHashedPassword(password);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      const isDulplicatedUsername = error.code === '23505';
      if (isDulplicatedUsername) {
        throw new ConflictException(
          `Already existing user. username: ${username}`,
        );
      }
      throw new InternalServerErrorException(error);
    }
    return user;
  }

  async singIn(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const foundUser = await this.userRepository.findOne({
      where: { username },
    });

    if (!!foundUser && (await bcrypt.compare(password, foundUser.password))) {
      return 'success login';
    } else {
      throw new UnauthorizedException('Fail to authenticate.');
    }
  }
}
