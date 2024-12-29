import { ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/genericTypes/Pagination';

@ArgsType()
export class GetUsers extends PaginationArgs {}
