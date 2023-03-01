import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from 'src/company/schema/company.schema';

export type AccountDocument = HydratedDocument<Account>;

@Schema({versionKey: false, timestamps: true})
export class Account {
  @Prop({required: true, unique: true})
  name: string;

  @Prop({type: Types.ObjectId, ref: 'Company'})
  company: Company

  @Prop({required: true})
  price: number;

  @Prop({default: '$', enum: ['$', '€'], required: true})
  currency: string

  @Prop({default: true})
  is_paid: boolean
}

export const AccountSchema = SchemaFactory.createForClass(Account);
