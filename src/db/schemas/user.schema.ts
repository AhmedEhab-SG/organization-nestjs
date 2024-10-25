import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    minlength: [2, 'Name is too short.'],
    maxlength: [64, 'Name is too long.'],
  })
  name: string;

  @Prop({
    unique: true,
    required: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Email must contain the @ symbol and a domain name.',
    ],
  })
  email: string;

  @Prop({
    required: true,
    minlength: [8, 'Password is too short.'],
    maxlength: [64, 'Password is too long.'],
  }) // we could add strong password validation here
  password: string;

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
