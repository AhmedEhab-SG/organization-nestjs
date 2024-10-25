import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { ParseObjectIdPipe } from 'src/shared/pipes/parseObjectId.pipe';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InviteMemberDto } from './dto/invite-memeber.dto';

@Controller('organization')
@UseGuards(AuthGuard) // in the task its on very route
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get('/')
  async getOrganizations() {
    return await this.organizationService.getOrganizations();
  }

  @Get('/:organization_id')
  async getOrganizationById(
    @Param('organization_id', ParseObjectIdPipe) organization_id: string,
  ) {
    return await this.organizationService.getOrganizationById(organization_id);
  }

  @Post('/')
  async create(@Body() organizationData: CreateOrganizationDto) {
    return await this.organizationService.create(organizationData);
  }

  @Put('/:organization_id')
  async update(
    @Param('organization_id', ParseObjectIdPipe) organization_id: string,
    @Body() organizationData: UpdateOrganizationDto,
  ) {
    return await this.organizationService.update(
      organization_id,
      organizationData,
    );
  }

  //we could add the invite in the same route as the update
  @Post('/:organization_id/invite')
  async inviteMember(
    @Param('organization_id', ParseObjectIdPipe) organization_id: string,
    @Body() inviteData: InviteMemberDto,
  ) {
    return await this.organizationService.inviteMember(
      organization_id,
      inviteData,
    );
  }

  @Delete('/:organization_id')
  async delete(
    @Param('organization_id', ParseObjectIdPipe) organization_id: string,
  ) {
    return await this.organizationService.delete(organization_id);
  }
}
