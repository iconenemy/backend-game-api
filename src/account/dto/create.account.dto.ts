import { IsNotEmpty } from 'class-validator'
import { Types } from 'mongoose';

export class CreateAccountDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly company: Types.ObjectId;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly currency: string;

    @IsNotEmpty()
    readonly is_paid: boolean;
}
