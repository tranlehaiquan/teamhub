import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field(() => String, { description: 'User name' })
  name: string;

  // email
  @Field(() => String, { description: 'User email' })
  email: string;

  // password
  @Field(() => String, { description: 'User password' })
  password: string;
}

@InputType()
export class UserSignIn {
  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User password' })
  password: string;
}
