import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;

@Schema()
export class Organization {
  @Prop({
    unique: true,
    required: true,
    minlength: [2, 'Name is too short.'],
    maxlength: [64, 'Name is too long.'],
  })
  name: string;

  @Prop({
    required: true,
    minlength: [15, 'Description is too short.'],
    maxlength: [500, 'Description is too long.'],
  })
  description: string;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        access_level: { type: String, required: true, default: 'member' },
      },
    ],
    required: true,
    default: [],
  })
  organization_members: {
    name: string;
    email: string;
    access_level: string;
  }[];

  @Prop({ type: Date, default: Date.now, required: true })
  createdAt: Date;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
