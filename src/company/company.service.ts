import { Model, ObjectId } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';

import { Company, CompanyDocument } from './schema/company.schema';
import { CreateCompanyDto } from './dto/create.company.dto';
import { UpdateCompanyDto } from './dto/update.company.dto';

@Injectable()
export class CompanyService {
    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

    async create(dto: CreateCompanyDto): Promise<Company> {
        return await this.companyModel.create(dto)
    }

    async findOne(id: ObjectId): Promise<Company> {
        return await this.companyModel.findById(id)
    }
    
    async findByName(id: string): Promise<Company> {
        return await this.companyModel.findOne({name: id})
    }

    async findAll(): Promise<Company[]> {
        return await this.companyModel.find()
    }

    async udpate(id: ObjectId, dto: UpdateCompanyDto): Promise<Company> {
        return await this.companyModel.findByIdAndUpdate(id, {...dto})
    }

    async delete(id: ObjectId): Promise<void> {
        await this.companyModel.findByIdAndDelete(id)
    }
}