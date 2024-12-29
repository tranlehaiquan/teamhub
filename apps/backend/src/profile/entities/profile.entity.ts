import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => String, { description: 'User id' })
  id: string;

  @Field(() => String, { description: 'User metadata' })
  metadata: string;
}
