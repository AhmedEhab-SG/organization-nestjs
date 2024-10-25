import { InviteMemberDto } from './dto/invite-memeber.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from 'src/db/schemas/organization.schema';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { User } from 'src/db/schemas/user.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // we can add here pagination and filter options by query params
  async getOrganizations() {
    try {
      const organizationDoc = await this.organizationModel.find();

      if (!organizationDoc.length)
        throw new HttpException({ message: 'no organizations found' }, 404);

      return organizationDoc;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 500);
    }
  }

  async getOrganizationById(organization_id: string) {
    try {
      const organizationDoc = await this.organizationModel.findOne({
        _id: organization_id,
      });

      if (!organizationDoc)
        throw new HttpException({ message: 'organization not found' }, 404);

      return organizationDoc;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 500);
    }
  }

  async create(organizationData: CreateOrganizationDto) {
    try {
      await this.organizationModel.create(organizationData);

      return { message: 'organization created successfully' };
    } catch (err) {
      if (err instanceof Error && 'code' in err && err.code === 11000)
        throw new HttpException(
          { message: 'organization is already exists' },
          409,
        );

      throw new HttpException({ message: 'something went wrong' }, 500);
    }
  }

  // we could add a decorator to check if the same user who careate the organization is the one who update it
  async update(
    organization_id: string,
    organizationData: UpdateOrganizationDto,
  ) {
    try {
      const organization =
        await this.organizationModel.findById(organization_id);

      if (!organization)
        throw new HttpException(
          { message: 'organization not found to update' },
          404,
        );

      await organization.updateOne({
        ...organizationData,
        _id: organization_id,
      });

      return { message: 'organization updated successfully' };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 500);
    }
  }

  async inviteMember(organization_id: string, inviteData: InviteMemberDto) {
    try {
      const organizationDoc =
        await this.organizationModel.findById(organization_id);

      if (!organizationDoc)
        throw new HttpException({ message: 'organization not found' }, 404);

      const userDoc = await this.userModel.findOne(
        { email: inviteData.user_email },
        { name: 1, email: 1, _id: 1 },
      );

      if (!userDoc) throw new HttpException({ message: 'user not found' }, 404);

      await organizationDoc.updateOne({
        $push: {
          organization_members: {
            email: userDoc.email,
            name: userDoc.name,
            user_id: userDoc._id,
            access_level: 'member', // hard coded for now, we can add it in the dto
          },
        },
      });

      return { message: 'member invited successfully' };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 500);
    }
  }

  async delete(organization_id: string) {
    try {
      const deleted =
        await this.organizationModel.findByIdAndDelete(organization_id);

      if (!deleted)
        throw new HttpException(
          { message: 'organization not found to delete' },
          404,
        );

      return { message: 'organization deleted successfully' };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new HttpException({ message: 'something went wrong' }, 500);
    }
  }
}
