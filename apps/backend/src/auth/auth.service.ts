import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput, UserSignIn } from './dto/create-auth.input';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { UserService } from 'src/user/user.service';

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

    return {
      ...results[0],
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
      ...user,
    };

    return {
      token: await this.JWTService.sign(payload),
    };
  }

  async getUserById(userId: string) {
    const users = await this.UserService.getUserById(userId);

    return users[0];
  }
}
