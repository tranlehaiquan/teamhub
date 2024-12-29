import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { Users } from './entities/User.entity';
import { UpdateUserInput } from './dto/update-user';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetUsers } from './dto/get-user';
import { ProfileService } from 'src/profile/profile.service';

@Resolver(() => Users)
class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

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

  @ResolveField()
  async profile(@Parent() user: Users) {
    const { id } = user;

    return this.profileService.findProfileByUserId(id);
  }
}

export { UserResolver };
