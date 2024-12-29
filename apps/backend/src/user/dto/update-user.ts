import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'User name', nullable: true })
  password?: string;

  @Field(() => String, { description: 'User email', nullable: true })
  role?: string;
}
