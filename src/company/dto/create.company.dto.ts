import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const companyValidateSchema = z.object({
    name: z.string({
            required_error: 'Name is required',
            invalid_type_error: "Name must be a string"
        }).min(4, { 
            message: "Must be 4 or more characters long" 
        })
        .max(30, {
             message: "Must be 30 or fewer characters long" 
        })
})

export class CreateCompanyDto extends createZodDto(companyValidateSchema) {}
