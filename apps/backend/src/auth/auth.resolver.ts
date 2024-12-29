import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthToken } from './entities/auth.entity';
import { Users } from '../user/entities/User.entity';
import { CreateAuthInput, UserSignIn } from './dto/create-auth.input';
import { AuthIsPublic, CurrentUser } from './decorators/user.decorator';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @AuthIsPublic()
  @Mutation(() => Users)
  signUp(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.register(createAuthInput);
  }

  @AuthIsPublic()
  @Mutation(() => AuthToken)
  signIn(@Args('userSignIn') userSignIn: UserSignIn) {
    return this.authService.login(userSignIn);
  }

  @Query(() => Users)
  whoAmI(@CurrentUser() user) {
    return this.authService.getUserById(user.id);
  }
}
