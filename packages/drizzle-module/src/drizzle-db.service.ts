import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  drizzle,
  NodePgClient,
  NodePgDatabase,
} from 'drizzle-orm/node-postgres';
import { DRIZZLE_DB_OPTIONS, DrizzleDbOptions } from './drizzle-db.constants';

@Injectable()
export class DrizzleService implements OnModuleInit {
  databaseURL: string;
  drizzleClient: NodePgDatabase<Record<string, never>> & {
    $client: NodePgClient;
  };

  constructor(@Inject(DRIZZLE_DB_OPTIONS) options: DrizzleDbOptions) {
    this.databaseURL = options.databaseURL;
  }

  async onModuleInit() {
    console.log('databaseURL', this.databaseURL);
    this.drizzleClient = drizzle(this.databaseURL);
    console.log('Drizzle client connected to the database');
  }
}
