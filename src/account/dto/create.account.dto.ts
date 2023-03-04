import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const accountValidateSchema = z.object({
    name: z.string({
            required_error: 'Name is required',
            invalid_type_error: "Name must be a string"
        }).min(4, { 
            message: "Name must be 4 or more characters long" 
        })
        .max(30, {
             message: "Name must be 30 or fewer characters long" 
        }),

    company: z.any(),

    price: z.number({
            required_error: "Price is required",
            invalid_type_error: "Price must be not a number",
        }).gte(5, {
            message: "Price must be greater or equal to 5"
        }),
        
    currency: z.enum(['$', '€']),

    is_paid: z.boolean().default(false)
})

export class CreateAccountDto extends createZodDto(accountValidateSchema) {}
