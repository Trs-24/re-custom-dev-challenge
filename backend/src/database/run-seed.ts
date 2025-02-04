import { DataSource } from 'typeorm';
import AppDataSource from './config';
import { seedUsersWithActivity } from './seeds/user.seed';

async function runSeeds() {
  const dataSource: DataSource = await AppDataSource.initialize();
  console.log('🔄 Running seeds...');

  await seedUsersWithActivity(dataSource);

  await dataSource.destroy();
  console.log('✅ Seeding completed');
}

runSeeds().catch(err => console.error('❌ Seeding error:', err));
