import { Model, ObjectId } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from './schema/account.schema';
import { CreateAccountDto } from './dto/create.account.dto';
import { UpdateAccountDto } from './dto/update.account.dto';

@Injectable()
export class AccountService {
    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

    async create (dto: CreateAccountDto): Promise<Account> {
        return await this.accountModel.create(dto)
    }

    async findOne(id: ObjectId): Promise<Account> {
        return await this.accountModel.findById(id)
    }

    async findAll(): Promise<Account[]> {
        return await this.accountModel.find()
    }

    async update(id: ObjectId, dto: UpdateAccountDto): Promise<Account> {
        return  await this.accountModel.findByIdAndUpdate(id, {...dto, createdAt: new Date(0)}, {new: true})
    }

    async delete(id: ObjectId): Promise<void> {
        return await this.accountModel.findByIdAndDelete(id)
    }

    async findByCompaniesName(companies_id: ObjectId[]): Promise<Account[]> {
        return await this.accountModel.find({company: {$in: companies_id}})
    }
}
