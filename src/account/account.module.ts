import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from "src/company/company.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { Account, AccountSchema } from "./schema/account.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]), CompanyModule 
    ],
    controllers: [AccountController],
    providers: [AccountService]
})
export class AccountModule {}
