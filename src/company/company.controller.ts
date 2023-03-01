import { Body, Controller, Delete, Post, NotFoundException, Put } from "@nestjs/common";
import { Get, Param } from "@nestjs/common";
import { ObjectId } from "mongoose";

import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create.company.dto";
import { UpdateCompanyDto } from "./dto/update.company.dto";


@Controller('/company')
export class CompanyController {
    constructor(private CompanyService: CompanyService) {}

    // api/company/create
    @Post('/create')
    async create(@Body() dto: CreateCompanyDto) {
        const { name } = dto
        const candidateByName = await this.CompanyService.findByName(name)
        if (candidateByName) {
            throw new NotFoundException ({message: `Sorry, name such as ${name} - has already been taken`})
        }
        return await this.CompanyService.create(dto)
    }

    // api/company/find/:id
    @Get('/find/:id')
    async findOne(@Param('id') id: ObjectId) {
        const candidateById = await this.CompanyService.findOne(id)
        if (!candidateById)  {
            throw new NotFoundException(`Sorry, such id ${id} - not found. Try again`)
        }
        return candidateById
    }

    // api/company/all
    @Get('/all')
    async findAll() {
        return await this.CompanyService.findAll()
    }

    // api/company/delete/:id
    @Delete('/delete/:id')
    async delete(@Param('id') id: ObjectId) {
        await this.CompanyService.delete(id)
        return {message: 'Company was removed', id: id, status: 200} 
    }

    @Put('update/:id')
    async update(@Param('id') id: ObjectId, @Body() dto: UpdateCompanyDto) {
        const candidateById = await this.CompanyService.findOne(id)
        if(!candidateById) throw new NotFoundException(`Sorry, such id ${id} - not found. Try again`)

        return await this.CompanyService.udpate(id, dto)
    }
}
