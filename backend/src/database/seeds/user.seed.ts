import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/domains/user/entities/user.entity';
import { Activity } from 'src/domains/activity/entities/activity.entity';
import {
  ActivityAction,
  ActivityStatus,
} from 'src/domains/activity/activity.types';
import { UserRole } from 'src/domains/user/user.types';

export async function seedUsersWithActivity(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const activityRepository = dataSource.getRepository(Activity);

  const existingUsers = await userRepository.count();
  if (existingUsers > 0) {
    console.log('Users already seeded, skipping...');
    return;
  }

  const users: User[] = [];

  // Create admin user
  const password = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'password123',
    10,
  );

  const user = new User();
  user.email = process.env.ADMIN_EMAIL || 'admin@example.com';
  user.name = 'Admin';
  user.password = password;
  user.role = UserRole.ADMIN;

  users.push(user);

  for (let i = 0; i < 10; i++) {
    const password = await bcrypt.hash('password123', 10);

    const user = new User();
    user.email = faker.internet.email();
    user.name = faker.internet.username();
    user.password = password;
    user.createdAt = faker.date.past();

    users.push(user);
  }

  const savedUsers = await userRepository.save(users);
  console.log('✅ Users seeded successfully');

  const activities: Activity[] = [];

  for (const user of savedUsers) {
    const activity = new Activity();
    activity.user = user;
    activity.action = ActivityAction.CREATE;
    activity.status = ActivityStatus.SUCCESS;
    activity.createdAt = user.createdAt;

    activities.push(activity);
    for (let i = 0; i < 10; i++) {
      const activity = new Activity();
      activity.user = user;
      activity.action = ActivityAction.LOGIN;
      activity.status = faker.helpers.enumValue(ActivityStatus);
      activity.createdAt = faker.date.between({
        from: user.createdAt,
        to: new Date(),
      });
      activities.push(activity);
    }
  }
  await activityRepository.save(activities);
  console.log('✅ Activities seeded successfully');
}
