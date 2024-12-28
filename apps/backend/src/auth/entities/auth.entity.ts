import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserAuth {
  @Field(() => String, { description: 'User id' })
  id: string;

  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User role' })
  role: string;
}

@ObjectType()
export class AuthToken {
  @Field(() => String, { description: 'JWT token' })
  token: string;
}
