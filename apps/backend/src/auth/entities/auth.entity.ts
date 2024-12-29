import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthToken {
  @Field(() => String, { description: 'JWT token' })
  token: string;
}
