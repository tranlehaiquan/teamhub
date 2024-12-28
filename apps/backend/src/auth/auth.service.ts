import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput, UserSignIn } from './dto/create-auth.input';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { UserService } from 'src/user/user.service';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly UserService: UserService,
  ) {}

  async register(createAuthInput: CreateAuthInput) {
    const isUserExist = await this.UserService.findUserByEmail(
      createAuthInput.email,
    );

    if (isUserExist.length > 0) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await hash(createAuthInput.password);
    const results = await this.UserService.createUser({
      ...createAuthInput,
      password: hashedPassword,
    });
    const user = results[0];

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async login(userSignIn: UserSignIn) {
    const email = userSignIn.email;

    const users = await this.UserService.findUserByEmail(email);
    const user = users[0];

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const password = user.password;
    const isCorrectPWD = await verify(password, userSignIn.password);
    if (!isCorrectPWD) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      token: await this.JWTService.sign(payload),
    };
  }

  async getUserById(userId: string) {
    const users = await this.UserService.getUserById(userId);

    return omit(users[0], ['password']);
  }
}
