import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({versionKey: false})
export class Company {
  @Prop({required: true, unique: true})
  name: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);