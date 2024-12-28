import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthToken, UserAuth } from './entities/auth.entity';
import { CreateAuthInput, UserSignIn } from './dto/create-auth.input';
import { AuthIsPublic, CurrentUser } from './decorators/user.decorator';
import { Roles } from './decorators/roles.decorator';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @AuthIsPublic()
  @Mutation(() => UserAuth)
  signUp(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.register(createAuthInput);
  }

  @AuthIsPublic()
  @Mutation(() => AuthToken)
  signIn(@Args('userSignIn') userSignIn: UserSignIn) {
    return this.authService.login(userSignIn);
  }

  @Query(() => UserAuth)
  whoAmI(@CurrentUser() user) {
    return this.authService.getUserById(user.id);
  }

  @Roles('admin')
  @Query(() => UserAuth)
  onlyAdmin() {
    return {
      id: 'admin only',
    };
  }
}
