import {
  Organization,
  OrganizationSchema,
} from '../schemas/organization.schema';
import { MongooseModule } from '@nestjs/mongoose';

export const OrganizationModel = MongooseModule.forFeatureAsync([
  {
    name: Organization.name,
    useFactory: () => OrganizationSchema,
  },
]);
