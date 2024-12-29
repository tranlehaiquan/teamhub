import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Users } from './entities/User.entity';
import { UpdateUserInput } from './dto/update-user';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Resolver('User')
class UserResolver {
  @Roles('admin')
  @Query(() => [Users])
  async users() {
    return [
      {
        id: 'admin only',
      }
    ]
  }

  @Roles('admin')
  @Mutation(() => Users)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return {
      id: 'admin only',
    }
  }
}

export { UserResolver };