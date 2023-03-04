import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const accountValidateSchema = z.object({
    company: z.any().array()
})

export class FindAccountDto extends createZodDto(accountValidateSchema) {}