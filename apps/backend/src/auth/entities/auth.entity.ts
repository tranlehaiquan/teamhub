import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@ObjectType()
export class UserAuth {
  @Field(() => String, { description: 'User id' })
  id: string;

  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User email' })
  email: string;
}
