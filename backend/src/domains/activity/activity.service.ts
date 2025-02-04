import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { ActivityAction, ActivityStatus, UpdatedField } from './activity.types';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async createActivity({
    user,
    action,
    status,
    updatedField,
  }: {
    user: User;
    action: ActivityAction;
    status: ActivityStatus;
    updatedField?: UpdatedField;
  }) {
    const activity = new Activity();
    activity.user = user;
    activity.action = action;
    activity.status = status;
    if (updatedField) {
      activity.updatedField = updatedField;
    }
    return this.activityRepository.save(activity);
  }
}
