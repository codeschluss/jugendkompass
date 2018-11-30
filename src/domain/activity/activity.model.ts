import { CrudModel } from '@portal/core';
import { ActivityEntity } from '../../api/models/activity-entity';
import { AddressModel } from '../address/address.model';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ScheduleModel } from '../schedule/schedule.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { UserModel } from '../user/user.model';

export class ActivityModel
  extends CrudModel implements ActivityEntity {

  public description: string;
  public name: string;
  public showUser: boolean;

  public address: Promise<AddressModel>;
  public category: Promise<CategoryModel>;
  public organisation: Promise<OrganisationModel>;
  public schedules: Promise<ScheduleModel[]>;
  public tags: Promise<TagModel[]>;
  public targetGroups: Promise<TargetGroupModel[]>;
  public user: Promise<UserModel>;

}
