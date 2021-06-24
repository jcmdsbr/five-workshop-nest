import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

@Schema()
export default class AccountDocument extends Document {
  @Prop({
    type: [
      {
        amount: { type: Number },
        date: { type: Date },
        description: { type: String },
      },
    ],
  })
  public transactions: { amount: number; date: Date; description: string }[];
  @Prop()
  public customerId: string;
  @Prop()
  public isActive: boolean;

  @Prop({
    type: String,
    default: function genUUID() {
      return v4();
    },
  })
  public _id: string;
}

export const AccountSchema = SchemaFactory.createForClass(AccountDocument);
