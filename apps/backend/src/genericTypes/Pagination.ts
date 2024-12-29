import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
class PaginationArgs {
  @Field(() => Int, { nullable: true })
  offset: number = 0;

  @Field(() => Int, { nullable: true })
  limit: number = 10;
}

export { PaginationArgs };
