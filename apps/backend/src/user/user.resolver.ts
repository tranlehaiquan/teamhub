import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Users } from './entities/User.entity';
import { UpdateUserInput } from './dto/update-user';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetUsers } from './dto/get-user';

@Resolver('User')
class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles('admin')
  @Query(() => [Users])
  async users(@Args() args: GetUsers) {
    return this.userService.findAll(args.offset, args.limit);
  }

  @Roles('admin')
  @Mutation(() => Users)
  async updateUserById(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    this.userService.updateUserById(id, updateUserInput);
  }
}

export { UserResolver };
