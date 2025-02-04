import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../user.types';
import { Activity } from 'src/domains/activity/entities/activity.entity';
import { ActivityAction } from 'src/domains/activity/activity.types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Activity, activity => activity.user)
  activity: Activity[];

  @CreateDateColumn()
  createdAt: Date;

  get totalLogins(): number {
    return this.activity.filter(
      activity => activity.action === ActivityAction.LOGIN,
    ).length;
  }

  get totalDownloads(): number {
    return this.activity.filter(
      activity => activity.action === ActivityAction.DOWNLOAD_REPORT,
    ).length;
  }

  get recentActivity(): Activity[] {
    const amountOfActivityNeeded = 5;
    return this.activity.slice(-amountOfActivityNeeded);
  }
}
