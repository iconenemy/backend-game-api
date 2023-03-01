import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ZodValidationPipe } from 'nestjs-zod'

import { AccountModule } from './account/account.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    CompanyModule,
    AccountModule
  ],
  providers: [{provide: APP_PIPE, useClass: ZodValidationPipe}]
})
export class AppModule {}
