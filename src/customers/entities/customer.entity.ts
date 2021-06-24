import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid';
@Schema()
export default class Customer extends Document {
  @Prop()
  public name: string;

  @Prop({
    type: String,
    default: function genUUID() {
      return v4();
    },
  })
  public _id: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
