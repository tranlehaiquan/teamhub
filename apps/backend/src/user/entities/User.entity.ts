import { ObjectType, Field } from '@nestjs/graphql';
import { Profile } from 'src/profile/entities/profile.entity';

@ObjectType()
export class Users {
  @Field(() => String, { description: 'User id' })
  id: string;

  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User role' })
  role: string;

  @Field(() => Profile, { description: 'User profile' })
  profile: Profile;
}
