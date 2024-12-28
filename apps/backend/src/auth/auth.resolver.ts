import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthToken, UserAuth } from './entities/auth.entity';
import { CreateAuthInput, UserSignIn } from './dto/create-auth.input';
import { AuthGuard } from './guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/user.decorator';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserAuth)
  signUp(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.register(createAuthInput);
  }

  @Mutation(() => AuthToken)
  signIn(@Args('userSignIn') userSignIn: UserSignIn) {
    return this.authService.login(userSignIn);
  }

  @Query(() => UserAuth)
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user) {
    return this.authService.getUserById(user.id);
  }
}
