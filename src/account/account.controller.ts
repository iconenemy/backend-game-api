import { Body, Controller, Param, Post, Get, Delete, Put, NotFoundException} from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CompanyService } from "src/company/company.service";
import { AccountService } from "./account.service";
import { CreateAccountDto } from "./dto/create.account.dto";
import { UpdateAccountDto } from "./dto/update.account.dto";

@Controller('account')
export class AccountController {
    constructor(private AccountService: AccountService, private CompanyService: CompanyService) {}
    
    // api/account/create
    @Post('/create')
    async create(@Body() dto: CreateAccountDto) {
        const company: ObjectId = dto.company
        const candidateByCompany = await this.CompanyService.findOne(company)
        if (!candidateByCompany) throw new NotFoundException(`Sorry, such company id ${company} - not found. Try again`)
        return await this.AccountService.create(dto)
    }

    // api/account/find/:id
    @Get('/find/:id')
    async findOne(@Param('id') id: ObjectId) {
        const candidateById = await this.AccountService.findOne(id)
        if (!candidateById)  {
            throw new NotFoundException(`Sorry, such id ${id} - not found. Try again`)
        }
        return candidateById
    }

    // api/account/all
    @Get('/all')
    async findAll() {
        return await this.AccountService.findAll()
    }

    // api/account/delete/:id
    @Delete('/delete/:id')
    async delete(@Param('id') id: ObjectId) {
        await this.AccountService.delete(id)
        return {message: 'Company was removed', id: id, status: 200} 
    }

    @Put('update/:id')
    async update(@Param('id') id: ObjectId, @Body() dto: UpdateAccountDto) {
        const candidateById = await this.AccountService.findOne(id)
        if(!candidateById) throw new NotFoundException(`Sorry, such id ${id} - not found. Try again`)

        const company: ObjectId = dto.company
        const candidateByCompany = await this.CompanyService.findOne(company)
        if (!candidateByCompany) throw new NotFoundException(`Sorry, such company id ${company} - not found. Try again`)

        return await this.AccountService.update(id, dto)
    }
}
