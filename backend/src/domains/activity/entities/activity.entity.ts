import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  ActivityAction,
  ActivityStatus,
  UpdatedField,
} from '../activity.types';
import { User } from 'src/domains/user/entities/user.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ActivityAction })
  action: ActivityAction;

  @Column({ type: 'enum', enum: UpdatedField, nullable: true, default: null })
  updatedField: UpdatedField | null;

  @Column({ type: 'enum', enum: ActivityStatus })
  status: ActivityStatus;

  @ManyToOne(() => User, user => user.activity, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
